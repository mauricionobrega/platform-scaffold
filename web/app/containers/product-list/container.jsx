/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'

import {isRunningInAstro} from '../../utils/astro-integration'
import ProductListHeader from './partials/product-list-header'
import SearchResultHeader from './partials/search-result-header'
import ProductListContents from './partials/product-list-contents'
import ProductListFilterModal from './partials/product-list-filter-modal'

const ProductList = ({route: {routeName}}) => {
    return (
        <div className="t-product-list">
            {!isRunningInAstro &&
                <div>
                    {routeName === 'searchResultPage' ?
                        <SearchResultHeader />
                    :
                        <ProductListHeader />
                    }
                </div>
            }
            <ProductListContents routeName={routeName} />
            <ProductListFilterModal />
        </div>
    )
}

ProductList.propTypes = {
    // Route object added by react router
    route: React.PropTypes.object
}

export default ProductList
