import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'

import {Icon} from 'progressive-web-sdk/dist/components/icon'

import {OFFLINE_MODAL} from './constants'
import {openModal} from '../../store/modals/actions'

const componentClass = 'c-offline-banner'

/**
 * A banner displayed at the top of the page to let users know they are offline.
 */

const OfflineBanner = ({
    className,
    style,
    openModal
}) => {
    const classes = classNames(componentClass, className)

    return (
        <div className={classes} style={style}>
            Currently browsing in offline mode
            <div onClick={openModal}  style={{float: 'right'}}>
                <Icon name="info" title="Offline mode information" />
            </div>


        </div>
    )
}

OfflineBanner.propTypes = {
    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string
}

const mapDispatchToProps = {
    openModal: () => openModal(OFFLINE_MODAL)
}

export default connect(null, mapDispatchToProps)(OfflineBanner)
