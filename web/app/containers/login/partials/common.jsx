/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {Field as ReduxFormField} from 'redux-form'
import {openModal} from 'progressive-web-sdk/dist/store/modals/actions'

import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import Link from 'progressive-web-sdk/dist/components/link'

import {REMEMBER_ME_MODAL} from '../constants'

export const LoginFieldLabel = ({label, forgotPassword}) => (
    <span>
        {label}

        {forgotPassword &&
            <Link className="u-float-end u-text-normal" href={forgotPassword.href}>
                Forgot Your Password?
            </Link>
        }
    </span>
)

LoginFieldLabel.propTypes = {
    forgotPassword: PropTypes.shape({
        href: PropTypes.string,
        title: PropTypes.string
    }),
    label: PropTypes.string
}

export const LoginField = ({label, type, forgotPassword, name, tooltip}) => (
    <FieldRow>
        <ReduxFormField
            name={name}
            label={<LoginFieldLabel label={label} forgotPassword={forgotPassword} />}
            component={Field}
            >
            <input type={type} />
        </ReduxFormField>

        {tooltip}
    </FieldRow>
)

LoginField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    forgotPassword: PropTypes.object,
    tooltip: PropTypes.node
}

const RememberMeTooltipContent = ({openModal}) => (
    <a href="#remember-me" onClick={openModal}>
        {'What\'s this?'}
    </a>
)

RememberMeTooltipContent.propTypes = {
    openModal: PropTypes.func
}

export const RememberMeTooltip = connect(null, {
    openModal: () => openModal(REMEMBER_ME_MODAL)
})(RememberMeTooltipContent)
