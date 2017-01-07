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
            <h1>Offline!</h1>

            We can not currently reach the Internet. <Button onClick={retry}>Click here to try again</Button>
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
