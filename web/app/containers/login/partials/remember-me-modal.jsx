/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {closeModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {isModalOpen} from 'progressive-web-sdk/dist/store/modals/selectors'

import Button from 'progressive-web-sdk/dist/components/button'
import Icon from 'progressive-web-sdk/dist/components/icon'
import Sheet from 'progressive-web-sdk/dist/components/sheet'

import {REMEMBER_ME_MODAL} from '../constants'


const RememberMeModalHeader = ({closeModal}) => (
    <div className="u-width-full u-bg-color-brand u-color-neutral-10 u-flexbox">
        <h1 className="u-flex u-padding-md u-h4 u-text-uppercase">
            Remember Me
        </h1>

        <Button onClick={closeModal}>
            <Icon name="close" />
            <span className="u-visually-hidden">Close</span>
        </Button>
    </div>
)

RememberMeModalHeader.propTypes = {
    closeModal: PropTypes.func
}

const RememberMeModal = ({closeModal, modalOpen}) => (
    <Sheet
        className="t-login__remember-me-modal"
        open={modalOpen}
        onDismiss={closeModal}
        effect="slide-bottom"
        headerContent={<RememberMeModalHeader closeModal={closeModal} />}
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
)

RememberMeModal.propTypes = {
    closeModal: PropTypes.func,
    modalOpen: PropTypes.bool
}

const mapStateToProps = createPropsSelector({
    modalOpen: isModalOpen(REMEMBER_ME_MODAL)
})

const mapDispatchToProps = {
    closeModal: () => closeModal(REMEMBER_ME_MODAL)
}

export default connect(mapStateToProps, mapDispatchToProps)(RememberMeModal)
