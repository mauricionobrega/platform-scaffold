import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as selectors from '../selectors'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import {changeSortIn} from '../../../store/categories/actions'

import List from 'progressive-web-sdk/dist/components/list'
import Image from 'progressive-web-sdk/dist/components/image'
import Icon from 'progressive-web-sdk/dist/components/icon'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

import ProductTile from './product-tile'

const ResultList = ({products}) => (
    <List className="c--borderless">
        {products.map((product, idx) => <ProductTile key={idx} {...product} />)}
    </List>
)

ResultList.propTypes = {
    products: PropTypes.array
}

const NoResultsList = ({bodyText}) => (
    <div className="u-flexbox u-direction-column u-align-center">
        <Image
            className="u-flex-none"
            alt="Crystal Ball"
            width="122px"
            height="110px"
            src={getAssetUrl('static/img/global/no-results.png')} />

        <div className="t-product-list__no-results-text u-text-align-center">
            {bodyText}
        </div>
    </div>
)

NoResultsList.propTypes = {
    bodyText: PropTypes.string
}

const ProductListContents = ({contentsLoaded, numItems, sort, sortChange, products, hasProducts, noResultsText}) => (
    <div className="t-product-list__container u-padding-end u-padding-bottom-lg u-padding-start">
        <div className="t-product-list__num-results u-padding-md">
            {contentsLoaded ?
                <div>
                    <span className="u-text-semi-bold">{numItems} Results</span>
                    <div>
                        {sort &&
                            <div>
                                <label for="sort">Sort by</label>
                                <div className="u-position-relative">
                                    <select
                                        className="t-product-list__sort-select"
                                        onChange={(e) => { sortChange(e.target.value) }}
                                        onBlur={(e) => { sortChange(e.target.value) }}
                                    >
                                        {sort.options.map((option) => <option value={option.value} key={option.value}>{option.text}</option>)}
                                    </select>
                                    <div className="t-product-list__sort-icon">
                                        <Icon name="caret-down" />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                    :
                <SkeletonBlock height="20px" />
            }
        </div>

        {(hasProducts || !contentsLoaded) ? <ResultList products={products} /> : <NoResultsList bodyText={noResultsText} />}
    </div>
)

ProductListContents.propTypes = {
    products: PropTypes.array.isRequired,
    contentsLoaded: PropTypes.bool,
    hasProducts: PropTypes.bool,
    noResultsText: PropTypes.string,
    numItems: PropTypes.string,
    sort: PropTypes.object,
    sortChange: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    hasProducts: selectors.getHasProducts,
    contentsLoaded: selectors.getProductListContentsLoaded,
    noResultsText: selectors.getNoResultsText,
    numItems: selectors.getNumItems,
    products: selectors.getSortedListProducts,
    sort: selectors.getSort
})

const mapDispatchToProps = {
    sortChange: changeSortIn
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductListContents)
