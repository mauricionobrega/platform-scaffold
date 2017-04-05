import React, {PropTypes} from 'react'
import {Field as ReduxFormField} from 'redux-form'

import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import Icon from 'progressive-web-sdk/dist/components/icon'
import Link from 'progressive-web-sdk/dist/components/link'
import Sheet from 'progressive-web-sdk/dist/components/sheet'

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

export const LoginFieldTooltip = ({tooltip, openModal, label, closeModal, modalOpen}) => (
    <div>
        <a href="#remember-me" onClick={openModal}>
            {tooltip.title}
        </a>

        <Sheet
            className="t-login__remember-me-modal"
            open={modalOpen}
            onDismiss={closeModal}
            effect="slide-bottom"
            headerContent={<LoginSheetHeader label={label} closeModal={closeModal} />}
        >
            <div id="remember-me" className="u-padding-md">
                {tooltip.content}
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

LoginFieldTooltip.propTypes = {
    closeModal: PropTypes.func,
    label: PropTypes.string,
    modalOpen: PropTypes.bool,
    openModal: PropTypes.func,
    tooltip: PropTypes.object
}

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

export const LoginField = ({label, required, type, forgotPassword, name, tooltip, modalInfo}) => (
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
