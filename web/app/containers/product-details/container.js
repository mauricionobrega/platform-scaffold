import React from 'react'

import ProductDetailsHeading from './partials/product-details-heading'
import ProductDetailsCarousel from './partials/product-details-carousel'
import ProductDetailsDescription from './partials/product-details-description'
import ProductDetailsAddToCart from './partials/product-details-add-to-cart'
import ProductDetailsItemAddedModal from './partials/product-details-item-added-modal'

const ProductDetails = () => {
    return (
        <div className="t-product-details">
            <ProductDetailsHeading />
            <ProductDetailsCarousel />
            <ProductDetailsDescription />
            <ProductDetailsAddToCart />
            <ProductDetailsItemAddedModal />
        </div>
    )
}

export default ProductDetails
