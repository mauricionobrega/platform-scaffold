import React from 'react'

import ProductListHeader from './partials/product-list-header'
import ProductListContents from './partials/product-list-contents'

const ProductList = () => {
    return (
        <div className="t-product-list">
            <ProductListHeader />
            <ProductListContents />
        </div>
    )
}

export default ProductList
