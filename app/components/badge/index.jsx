import React, {PropTypes} from 'react'
import classNames from 'classnames'

const componentClass = 'c-badge'

/**
 * A badge is a simple, circular element used to display small amounts of
 * important information, such as the number of items in a cart.
 */

const Badge = ({
    className,
    title,
    children,
}) => {
    const classes = classNames(componentClass, className)

    return (
        <span className={classes}>
            <span aria-hidden="true">{children}</span>

            {title &&
                <span className="u-visually-hidden">{title}</span>
            }
        </span>
    )
}


Badge.propTypes = {
    /**
     * The title provides text for user agents like screen readers
     */
    title: PropTypes.string.isRequired,

    /**
     * Any children to be nested within this Badge. **Note!** This is
     * intentionally hidden from screen readers! Use the `title` to provide
     * meaningful text instead.
     */
    children: PropTypes.node,

    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,
}

export default Badge
