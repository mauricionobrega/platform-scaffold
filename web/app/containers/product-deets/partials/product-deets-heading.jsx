import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import * as selectors from '../selectors'
import {createPropsSelector} from 'reselect-immutable-helpers'

import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import StarRating from '../../../components/star-rating'

const ProductDeetsHeading = ({title, price}) => (
    <div className="t-product-deets__heading u-padding-md u-box-shadow u-position-relative u-z-index-1">
        {title ?
            <h1 className="u-text-uppercase u-margin-bottom u-justify-center u-flexbox">{title}</h1>
        :
            <SkeletonBlock width="50%" height="32px" className="u-margin-bottom u-justify-center u-flexbox" />
        }

        {title ?
            <StarRating className="u-justify-center u-flexbox" numStars={3} maxStars={5} />
        :
            <SkeletonBlock width="50%" height="32px" className="u-margin-bottom u-justify-center u-flexbox" />
        }

        {price ?
            <span className="u-color-accent u-text-normal u-text-header-font-family u-text-letter-spacing u-justify-center u-flexbox">
                {price}
            </span>
        :
            <SkeletonBlock width="25%" height="32px" className="u-margin-bottom u-justify-center u-flexbox" />
        }
    </div>
)

ProductDeetsHeading.propTypes = {
    price: PropTypes.string,
    title: PropTypes.string,
}

const mapStateToProps = createPropsSelector({
    price: selectors.getProductPrice,
    title: selectors.getProductTitle,
})

export default connect(mapStateToProps)(ProductDeetsHeading)
