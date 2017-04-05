import React, {PropTypes} from 'react'
import classNames from 'classnames'

const componentClass = 'c-star-rating'

/**
 * StarRating displays a set of empty stars to represent the maximum possible rating for
 * the product and displays a set of filled-in stars on top of the empty stars to represent
 * the current rating for the product.
 */

const StarRating = ({
    numStars,
    className
}) => {
    const classes = classNames(componentClass, className, {
        // 'c--modifier': bool ? true : false
    })

    return (
        <div className={classes}>
            <span className={numStars === 5 ? `${componentClass}__star c--filled-in` : `${componentClass}__star`}>☆</span>
            <span className={numStars >= 4 ? `${componentClass}__star c--filled-in` : `${componentClass}__star`}>☆</span>
            <span className={numStars >= 3 ? `${componentClass}__star c--filled-in` : `${componentClass}__star`}>☆</span>
            <span className={numStars >= 2 ? `${componentClass}__star c--filled-in` : `${componentClass}__star`}>☆</span>
            <span className={numStars >= 1 ? `${componentClass}__star c--filled-in` : `${componentClass}__star`}>☆</span>
        </div>
    )
}

StarRating.propTypes = {
    /**
     * Determines the number of filled-in stars to display and should
     * reflect the product's current rating.
     */
    numStars: PropTypes.number.isRequired,

    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

}

export default StarRating
