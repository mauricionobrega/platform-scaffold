import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import * as selectors from '../selectors'
import {createPropsSelector} from 'reselect-immutable-helpers'

import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import StarRating from '../../../components/star-rating'

const ProductDeetsHeading = ({title, price}) => (
    <div className="t-product-deets-heading u-padding-md u-box-shadow u-position-relative u-z-index-1">
        {title ?
            <h1 className="t-product-deets-heading__title u-text-uppercase u-margin-bottom">{title}</h1>
        :
            <SkeletonBlock width="50%" height="32px" className="u-margin-bottom" />
        }

        {title ?
            <StarRating numStars={3} maxStars={5} />
        :
            <SkeletonBlock width="50%" height="32px" className="u-margin-bottom" />
        }

        {price ?
            <span className="t-product-deets-heading__price t-product-deets__price u-color-accent u-text-normal u-text-header-font-family u-text-letter-spacing">{price}</span>
        :
            <SkeletonBlock width="25%" height="32px" />
        }
    </div>
)

ProductDeetsHeading.propTypes = {
    ctaText: PropTypes.string,
    price: PropTypes.string,
    title: PropTypes.string,
}

const mapStateToProps = createPropsSelector({
    ctaText: selectors.getCTAText,
    price: selectors.getProductPrice,
    title: selectors.getProductTitle,
})

export default connect(mapStateToProps)(ProductDeetsHeading)
