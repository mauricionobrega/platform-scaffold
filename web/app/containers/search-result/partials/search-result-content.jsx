import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getHasProducts, getSearchResultContentsLoaded, getFilteredAndSortedListProducts} from '../selectors'

import {changeFilterTo} from '../../../store/categories/actions'

import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import List from 'progressive-web-sdk/dist/components/list'
import Image from 'progressive-web-sdk/dist/components/image'
import ProductTile from '../../../components/product-tile'

const ResultList = ({products}) => {
    console.log('products', products)
    return (
        <List className="c--borderless">
            {products.map((product, idx) => (<ProductTile key={idx} {...product} />))}
        </List>
    )
}

ResultList.propTypes = {
    products: PropTypes.array
}

const NoResultsList = () => (
    <div className="u-flexbox u-direction-column u-align-center">
        <Image
            className="u-flex-none"
            alt="Crystal Ball"
            width="122px"
            height="110px"
            src={getAssetUrl('static/img/global/no-results.png')} />

        <div className="t-search-result__no-results-text u-text-align-center">
            your search returned no results. Please check your spelling and try searching again.
        </div>
    </div>
)

NoResultsList.propTypes = {
    bodyText: PropTypes.string
}

const SearchResultContent = ({hasProducts, products, contentsLoaded}) => {
    return (
        <div className="t-search-result__container u-padding-end u-padding-bottom-lg u-padding-top-lg u-padding-start">
            {(hasProducts || !contentsLoaded) ?
                <div>
                    <div className="t-product-list__filter u-flex u-margin-end-md">
                        <div className="u-text-semi-bold u-margin-bottom-sm">
                            {products.length} Items
                        </div>
                    </div>

                    <ResultList products={products} />
                </div>
            :
                <NoResultsList />
            }
        </div>
    )
}

SearchResultContent.propTypes = {
    contentsLoaded: PropTypes.bool,
    hasProducts: PropTypes.bool,
    products: PropTypes.array,
}

const mapStateToProps = createPropsSelector({
    hasProducts: getHasProducts,
    products: getFilteredAndSortedListProducts,
    contentsLoaded: getSearchResultContentsLoaded,

})

const mapDispatchToProps = {
    clearFilters: () => changeFilterTo(null),
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultContent)
