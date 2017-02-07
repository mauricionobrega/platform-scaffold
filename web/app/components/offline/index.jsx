import React, {PropTypes} from 'react'
import classNames from 'classnames'

import Button from 'progressive-web-sdk/dist/components/button'

const componentClass = 'c-offline'

/**
 * UI to be shown instead of the page contents while offline and no
 * contents are available.
 */

const Offline = ({
    retry,
    className
}) => {
    const classes = classNames(componentClass, className)

    return (
        <div className={classes}>
            <div>Fiddlesticks! We couldn't load the next page on this connection.</div>
            <div>Please try again.</div>
            <Button onClick={retry}>Retry</Button>
        </div>
    )
}


Offline.propTypes = {
    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

    /**
     * Callback to retry the page load
     */
    retry: PropTypes.func
}

export default Offline
