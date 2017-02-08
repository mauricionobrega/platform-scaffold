import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import {Icon} from 'progressive-web-sdk/dist/components/icon'

import {OFFLINE_MODAL} from './constants'
import {openModal} from '../../store/modals/actions'

/**
 * A banner displayed at the top of the page to let users know they are offline.
 */

const OfflineBanner = ({
    openModal
}) => {

    return (
        <div className="t-offline-banner u-width-full u-padding-md">
            Currently browsing in offline mode
            <div className="t-offline-banner__icon" onClick={openModal}>
                <Icon name="info" title="Offline mode information" />
            </div>


        </div>
    )
}

OfflineBanner.propTypes = {
    openModal: PropTypes.func.isRequired
}

const mapDispatchToProps = {
    openModal: () => openModal(OFFLINE_MODAL)
}

export default connect(null, mapDispatchToProps)(OfflineBanner)
