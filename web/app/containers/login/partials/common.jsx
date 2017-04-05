import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {Field as ReduxFormField} from 'redux-form'
import {openModal, closeModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {isModalOpen} from 'progressive-web-sdk/dist/store/modals/selectors'

import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import Icon from 'progressive-web-sdk/dist/components/icon'
import Link from 'progressive-web-sdk/dist/components/link'
import Sheet from 'progressive-web-sdk/dist/components/sheet'

import {REMEMBER_ME_MODAL} from '../constants'

export const PanelHeading = ({heading}) => {
    return (
        <h3 className="u-margin-bottom u-color-brand u-text-font-family u-text-normal">
            {heading}
        </h3>
    )
}

PanelHeading.propTypes = {
    heading: PropTypes.string.isRequired
}

export const LoginSheetHeader = ({label, closeModal}) => (
    <div className="u-width-full u-bg-color-brand u-color-neutral-10 u-flexbox">
        <h1 className="u-flex u-padding-md u-h4 u-text-uppercase">
            {label}
        </h1>

        <Button onClick={closeModal}>
            <Icon name="close" />
            <span className="u-visually-hidden">Close</span>
        </Button>
    </div>
)

LoginSheetHeader.propTypes = {
    closeModal: PropTypes.func,
    label: PropTypes.string
}

const TOOLTIP_TITLE = 'What\'s this?'

const RawLoginFieldTooltip = ({openModal, closeModal, modalOpen}) => (
    <div>
        <a href="#remember-me" onClick={openModal}>
            {TOOLTIP_TITLE}
        </a>

        <Sheet
            className="t-login__remember-me-modal"
            open={modalOpen}
            onDismiss={closeModal}
            effect="slide-bottom"
            headerContent={<LoginSheetHeader label="Remember Me" closeModal={closeModal} />}
        >
            <div id="remember-me" className="u-padding-md">
                Check "Remember Me" to access your shopping cart on this computer even if you are not signed in.
            </div>

            <div className="t-login__remember-me-button u-padding-md">
                <Button
                    className="c-button c--secondary u-text-uppercase u-margin-top-lg u-width-full"
                    onClick={closeModal}
                >
                    Continue
                </Button>
            </div>
        </Sheet>
    </div>
)

RawLoginFieldTooltip.propTypes = {
    closeModal: PropTypes.func,
    modalOpen: PropTypes.bool,
    openModal: PropTypes.func,
}

export const LoginFieldTooltip = connect(createPropsSelector({
    modalOpen: isModalOpen(REMEMBER_ME_MODAL)
}), {
    openModal: () => openModal(REMEMBER_ME_MODAL),
    closeModal: () => closeModal(REMEMBER_ME_MODAL)
})(RawLoginFieldTooltip)

export const LoginFieldLabel = ({label, required, forgotPassword}) => (
    <span>
        {label} {required && <span>*</span>}

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
    label: PropTypes.string,
    required: PropTypes.bool,
}

export const LoginField = ({label, required, type, forgotPassword, name, tooltip}) => (
    <FieldRow>
        <ReduxFormField
            name={name}
            label={<LoginFieldLabel label={label} required={required} forgotPassword={forgotPassword} />}
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
    required: PropTypes.bool,
    tooltip: PropTypes.node
}
