import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'

const componentClass = 'c-offline-banner'

/**
 * A banner displayed at the top of the page to let users know they are offline.
 */

const OfflineBanner = ({
    className
}) => {
    const classes = classNames(componentClass, className)

    return (
        <div className={classes}>
            Currently browsing in offline mode
        </div>
    )
}

OfflineBanner.propTypes = {
    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string

}

const mapDispatchToProps = (dispatch, props) => {
    return {
        openInfo: () => {},
        closeInfo: () => {}
    }
}

export default connect(
    {},
    mapDispatchToProps
)(OfflineBanner)
