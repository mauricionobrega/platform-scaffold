import React from 'react'
import RegisterForm from './register-form'

const RegisterPanel = () => (
    <div className="t-login__register-panel">
        <div className="u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow">
            <h3 className="u-margin-bottom u-color-brand u-text-font-family u-text-normal">
                New Customers
            </h3>
            <p>
                {'Creating an account has many benefits: check out faster, keep more than one address, track orders, and more'}
            </p>
            <div className="u-margin-top">
                {'* Required Fields'}
            </div>
        </div>

        <div className="u-bg-color-neutral-10 u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow-inset">
            <RegisterForm />
        </div>
    </div>
)

export default RegisterPanel
