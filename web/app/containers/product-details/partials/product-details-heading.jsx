/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import * as selectors from '../selectors'
import {createPropsSelector} from 'reselect-immutable-helpers'

import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import Breadcrumbs from 'progressive-web-sdk/dist/components/breadcrumbs'

import {isRunningInAstro} from '../../../utils/astro-integration'

const checkoutBreadcrumb = [
    {
        text: 'Cart',
        href: '/checkout/cart'
    }
]

const ProductDetailsHeading = ({breadcrumbs, title, price, isInCheckout}) => (
    <div className="t-product-details-heading u-padding-md u-box-shadow u-position-relative u-z-index-1">
        {!isRunningInAstro &&
            <div className="t-product-details__breadcrumbs u-margin-bottom-md">
                <Breadcrumbs items={isInCheckout ? checkoutBreadcrumb : breadcrumbs} />
            </div>
        }
        {title ?
            <h1 className="t-product-details-heading__title u-text-uppercase u-margin-bottom">{title}</h1>
        :
            <SkeletonBlock width="50%" height="32px" className="u-margin-bottom" />
        }

        {price ?
            <span className="t-product-details-heading__price t-product-details__price u-color-accent u-text-normal u-text-header-font-family u-text-letter-spacing">{price}</span>
        :
            <SkeletonBlock width="25%" height="32px" />
        }
    </div>
)

ProductDetailsHeading.propTypes = {
    breadcrumbs: PropTypes.array,
    isInCheckout: PropTypes.bool,
    price: PropTypes.string,
    title: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    breadcrumbs: selectors.getProductDetailsBreadcrumbs,
    title: selectors.getProductTitle,
    price: selectors.getProductPrice
})

export default connect(mapStateToProps)(ProductDetailsHeading)
