import React from 'react'

import * as commands from '../../integration-manager/commands'
import {isRunningInAstro} from '../../utils/astro-integration'
import ProductListHeader from './partials/product-list-header'
import ProductListContents from './partials/product-list-contents'

const ProductList = () => {
    return (
        <div className="t-product-list">
            {!isRunningInAstro &&
                <ProductListHeader />
            }
            <ProductListContents />
        </div>
    )
}

ProductList.fetcher = (url, routeName, dispatch) => dispatch(commands.fetchProductListData(url, routeName))

export default ProductList
