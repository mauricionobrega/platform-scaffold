import React from 'react'

import SignInForm from './signin-form'
import {PanelHeading} from './common'

const signinDescription = 'If you have an account, sign in with your email address.'

const requiredText = '* Required Fields'

const SignInPanel = () => (
    <div className="t-login__signin-panel">
        <div className="u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow">
            <div className="u-margin-bottom">
                <PanelHeading heading="Registered Customers" />
            </div>

            <p>
                {signinDescription}
            </p>

            <div className="u-margin-top">
                {requiredText}
            </div>
        </div>

        <div className="u-bg-color-neutral-10 u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow-inset">
            <SignInForm />
        </div>
    </div>
)


export default SignInPanel
