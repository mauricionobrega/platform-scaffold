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
    maxStars,
    className
}) => {
    const classes = classNames(componentClass, className)
    return (
        <div className={classes}>
            {[...Array(maxStars).keys()].reverse().map((currentRating, index) =>
                <span key={index} className={numStars >= currentRating + 1 ? `${componentClass}__star c--filled-in` : `${componentClass}__star`}>☆</span>
            )}
        </div>
    )
}

StarRating.propTypes = {
    /**
     * Determines the maximum number of possible stars.
     */
    maxStars: PropTypes.number.isRequired,

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
