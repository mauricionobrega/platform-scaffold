/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import IconLabelButton from '../../../components/icon-label-button'
import {OFFLINE_MODAL} from '../constants'
import {openModal} from 'progressive-web-sdk/dist/store/modals/actions'

/**
 * A banner displayed at the top of the page to let users know they are offline.
 */
const OfflineBanner = ({
    openModal
}) => {

    return (
        <header className="t-offline-banner__wrapper">
            <div className="t-offline-banner u-flexbox u-align-center u-width-full">
                <div className="u-flex u-margin-start-md">Currently browsing in offline mode</div>
                <IconLabelButton iconName="info" label="" onClick={openModal} />
            </div>
        </header>
    )
}

OfflineBanner.propTypes = {
    openModal: PropTypes.func.isRequired
}

const mapDispatchToProps = {
    openModal: () => openModal(OFFLINE_MODAL)
}

export default connect(null, mapDispatchToProps)(OfflineBanner)
