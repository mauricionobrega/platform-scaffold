import React from 'react'
import template from '../../template'

import {fetchProductListData} from '../../integration-manager/categories/commands'
import {isRunningInAstro} from '../../utils/astro-integration'
import ProductListHeader from './partials/product-list-header'
import ProductListContents from './partials/product-list-contents'
import ProductListFilterModal from './partials/product-list-filter-modal'

const ProductList = () => {
    return (
        <div className="t-product-list">
            {!isRunningInAstro &&
                <ProductListHeader />
            }

            <ProductListContents />
            <ProductListFilterModal />
        </div>
    )
}

ProductList.fetcher = (url, routeName, dispatch) => dispatch(fetchProductListData(url, routeName))


export default template(ProductList)
