import React, {PropTypes} from 'react'
import classNames from 'classnames'

import Button from 'progressive-web-sdk/dist/components/button'
import ListTile from 'progressive-web-sdk/dist/components/link'

const componentClass = 'c-offline'

/**
 * INSERT_DESCRIPTION_HERE
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

}

export default Offline
