import React from 'react'
import SignInForm from './signin-form'

const SignInPanel = () => (
    <div className="t-login__signin-panel">
        <div className="u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow">
            <p>
                If you have an account, sign in with your email address.
            </p>
        </div>

        <div className="u-bg-color-neutral-10 u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow-inset">
            <SignInForm />
        </div>
    </div>
)

export default SignInPanel
