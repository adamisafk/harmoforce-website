import { useEthers } from '@usedapp/core'
import React from 'react'
import Button from '../../components/elements/Button';
import { toBech32 } from '@harmony-js/crypto';

import { createDelegator, deleteDelegator } from '../../utils/DynamoDB';

export const AddDelegator = ({delegators}) => {
    const { account } = useEthers()

    const addDelegator = () => {
        createDelegator(toBech32(account)).then(res => {
            window.location.reload(false);
        })
    }
    const removeDelegator = () => {
        deleteDelegator(toBech32(account)).then(res => {
            window.location.reload(false);
        })
    }
    const isAddressPresent = () => {
        let bool = false
        delegators.forEach(delegator => {
            if(delegator.address === toBech32(account)) {
                bool = true
            }
        })
        return bool
    }

    const button = () => {
        if(account) {
            if(isAddressPresent()) {
                return (
                    <Button style={{marginBottom: '50px'}} className="button button-error button-wide button-sm" onClick={() => removeDelegator()}>Remove Wallet as a Harmoforce Delegator</Button>
                )
            }
            return (
                <Button style={{marginBottom: '50px'}} className="button button-secondary button-wide button-sm" onClick={() => addDelegator()}>Register Wallet as a Harmoforce Delegator</Button>
            )
        }
    }

    return (
        <div className="m-0">
            {button()}
        </div>
    )
}
