import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'

import {isOffline} from '../../containers/app/reducer'

const componentClass = 'c-offline-banner'

/**
 * INSERT_DESCRIPTION_HERE
 */

const OfflineBanner = ({
    isOffline,
    className
}) => {
    const classes = classNames(componentClass, className, {
        // 'c--modifier': bool ? true : false
    })

    return isOffline ? (
        <div className={classes}>
            Currently browsing in offline mode
        </div>
    ) : null
}


OfflineBanner.propTypes = {
    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

}

const mapStateToProps = (state) => {
    return {
        isOffline: isOffline(state)
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        openInfo: () => {},
        closeInfo: () => {}
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OfflineBanner)
