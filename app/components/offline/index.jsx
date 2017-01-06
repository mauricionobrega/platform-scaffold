import React, {PropTypes} from 'react'
import classNames from 'classnames'

import Link from 'progressive-web-sdk/dist/components/link'

const componentClass = 'c-offline'

/**
 * INSERT_DESCRIPTION_HERE
 */

const Offline = ({
    className
}) => {
    const classes = classNames(componentClass, className)

    return (
        <div className={classes}>
            <h1>Offline!</h1>

            We can not currently reach the Internet. <Link href={window.location.href}>Click here to try again</Link>
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
