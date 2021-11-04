import { useEthers } from '@usedapp/core'
import React, {useState} from 'react'
import Button from '../../elements/Button'
import { useEffect } from 'react'

export const ConnectWallet = () => {
    const [activateError, setActivateError] = useState('');
    const { activateBrowserWallet, deactivate, account, error } = useEthers()

    useEffect(() => {
        if (error) {
            setActivateError(error.message)
        }
    }, [error])

    const activate = async () => {
        setActivateError('')
        activateBrowserWallet()
    }

    const button = () => {
        if(activateError) {
            return (
                <Button className="button button-error button-wide-mobile button-sm">Wrong Network</Button> 
            )
        }

        if(!account) {
            return (
                <Button className="button button-secondary button-wide-mobile button-sm" onClick={() => activate()}>Connect Wallet</Button> 
            )
        } else if(account) {
            return (
                <Button className="button button-primary button-wide-mobile button-sm" onClick={() => deactivate()}>Connected</Button>
            )
        }
    }

    return (
        <div>
            {button()}
        </div>
    )
}
