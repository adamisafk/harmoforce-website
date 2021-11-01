import axios from 'axios';

import {getValidatorAddress} from './DynamoDB'

const url = "https://rpc.s0.t.hmny.io"

export const getValidator = async () => {
    const validatorAddress = await getValidatorAddress()
    const payload = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "hmyv2_getValidatorInformation",
        "params": [validatorAddress[0]["address"]]
    }

    const config = {
        method: 'post',
        url: url,
        headers: {'content-type': 'application/json'},
        data: payload
    }

    let response = await axios(config)

    let validatorInfo = {
        name: response.data.result.validator.name,
        address: response.data.result.validator.address,
        status: (response.data.result["epos-status"] === "currently elected" ? "Elected" : "Not Elected"),
        apr: (parseFloat(response.data.result.lifetime.apr) * 100).toFixed(2) + "%",
        url: "https://staking.harmony.one/validators/mainnet/" + response.data.result.validator.address
    }

    return validatorInfo
}