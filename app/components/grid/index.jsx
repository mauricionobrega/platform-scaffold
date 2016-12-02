import React, {PropTypes} from 'react'
import classNames from 'classnames'

/**
 * Grid is a helper component for preparing grid layouts. It acts as the initial
 * foundation for those grid layouts, applying the necessary initial parameters
 * within which any grid layouts can be added.
 *
 * Our grid framework of choice is [Susy](http://susydocs.oddbird.net/en/latest/)
 * and any of its mixins can be added via the SCSS files.
 */

const Grid = ({
    children,
    className
}) => {
    const classes = classNames('c-grid', className)

    return (
        <div className={classes}>
            <div className="c-grid__inner">
                {children}
            </div>
        </div>
    )
}


Grid.propTypes = {
    /**
     * Any children to be nested within this ProductItem
     */
    children: PropTypes.node,

    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

}

export default Grid
