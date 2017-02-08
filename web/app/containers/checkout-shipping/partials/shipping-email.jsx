import React from 'react'
import {connect} from 'react-redux'
import * as ReduxForm from 'redux-form'

import {onShippingEmailRecognized} from '../actions'

import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import {Icon} from 'progressive-web-sdk/dist/components/icon'
import Link from 'progressive-web-sdk/dist/components/link'


const ShippingEmail = ({onShippingEmailRecognized}) => {

    const passwordHint = (
        <Link className="u-color-brand" href="/customer/account/forgotpassword/">
            Forgot password
        </Link>
    )
    const isSigningIn = true

    return (
        <div>
            <div className="t-checkout-shipping__email-title" />

            <div className="u-padding-md u-border-light-top u-border-light-bottom u-bg-color-neutral-00">
                <FieldRow>
                    <ReduxForm.Field component={Field} className="pw--overlayed-hint" name="email" label="Email my receipt to">
                        <input type="email" noValidate />
                    </ReduxForm.Field>
                </FieldRow>

                {isSigningIn &&
                    <FieldRow>
                        <ReduxForm.Field component={Field} name="password" label="Password" hint={passwordHint}>
                            <input type="password" noValidate />
                        </ReduxForm.Field>
                    </FieldRow>
                }

                {isSigningIn &&
                    <FieldRow>
                        <Button
                            className="c--secondary u-width-full u-text-uppercase"
                            onClick={onShippingEmailRecognized}>
                            <Icon name="user" className="u-margin-end" />
                            Sign In
                        </Button>
                    </FieldRow>
                }
            </div>
        </div>
    )
}

ShippingEmail.propTypes = {
    /**
     * Whether the form is disabled or not
     */
    onShippingEmailRecognized: React.PropTypes.func
}

const mapStateToProps = (state) => {
    // No content from the state is currently needed for this partial
    return {}
}

const mapDispatchToProps = {
    onShippingEmailRecognized
}


export default connect(mapStateToProps, mapDispatchToProps)(ShippingEmail)
