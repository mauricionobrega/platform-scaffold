import React from 'react'

import ProductDeetsHeading from './partials/product-deets-heading'
import ProductDeetsGallery from './partials/product-deets-gallery'
import ProductDeetsForm from './partials/product-deets-form'
// import ProductDeetsAddToCart from './partials/product-deets-add-to-cart'
import ProductDeetsDescription from './partials/product-deets-description'

const ProductDeets = () => {
    return (
        <div className="t-product-deets">
            <ProductDeetsHeading />
            <ProductDeetsGallery />
            <ProductDeetsForm />
            <ProductDeetsDescription />
        </div>
    )
}

export default ProductDeets
