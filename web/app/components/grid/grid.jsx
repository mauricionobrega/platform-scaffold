import React, {PropTypes} from 'react'
import classNames from 'classnames'

/**
 * Grid is a wrapper component for preparing grid layouts. It acts as the
 * initial foundation in which the GridSpan component may be used to
 * define layouts.
 *
 * Our grid framework of choice is [Susy](http://susydocs.oddbird.net/en/latest/)
 * and all of Grid's and GridSpan's behaviors are defined with the Susy mixins.
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
