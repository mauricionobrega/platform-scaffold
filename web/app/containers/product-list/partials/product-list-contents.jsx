/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getCategoryItemCount} from '../../../store/categories/selectors'
import * as selectors from '../selectors'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import {PRODUCT_LIST_FILTER_MODAL} from '../constants'
import {openModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {changeFilterTo} from '../../../store/categories/actions'
import {changeSort} from '../actions'

import Button from 'progressive-web-sdk/dist/components/button'
import List from 'progressive-web-sdk/dist/components/list'
import Image from 'progressive-web-sdk/dist/components/image'
import Icon from 'progressive-web-sdk/dist/components/icon'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

import ProductTile from '../../../components/product-tile'

const noResultsText = 'We can\'t find products matching the selection'
const emptySearchText = 'Your search returned no results. Please check your spelling and try searching again.'

const ResultList = ({products}) => (
    <List className="c--borderless">
        {products.map((product, idx) => {
            return product ?
                <ProductTile key={product.id} {...product} />
                :
                <ProductTile key={idx} />
        })}
    </List>
)

ResultList.propTypes = {
    products: PropTypes.array
}

const NoResultsList = ({routeName}) => (
    <div className="u-flexbox u-direction-column u-align-center">
        <Image
            className="u-flex-none"
            alt="Crystal Ball"
            width="122px"
            height="110px"
            src={getAssetUrl('static/img/global/no-results.png')}
        />

        <div className="t-product-list__no-results-text u-text-align-center">
            {routeName === 'searchResultPage' ? emptySearchText : noResultsText}
        </div>
    </div>
)

NoResultsList.propTypes = {
    routeName: PropTypes.string
}

const ProductListContents = ({
    activeFilters,
    clearFilters,
    contentsLoaded,
    products,
    openModal,
    sortChange,
    routeName
}) => (
    <div>
        {contentsLoaded && activeFilters.length > 0 && (
            <div className="u-flexbox u-align-center u-border-light-top">
                <div className="u-flex u-padding-start-md">
                    {activeFilters.map(({label, query}) =>
                        <div className="t-product-list__active-filter" key={query}>
                            <strong>Price</strong>: {label}
                        </div>
                    )}
                </div>
                <div className="u-flex-none">
                    <Button
                        className="u-color-brand"
                        icon="trash"
                        onClick={clearFilters}
                    >
                        Clear
                    </Button>
                </div>
            </div>
        )}

        <div className="t-product-list__container u-padding-end u-padding-bottom-lg u-padding-start">
            <div className="t-product-list__num-results u-padding-md u-padding-start-sm u-padding-end-sm">
                {contentsLoaded ?
                    <div>
                        {products.length > 0 &&
                            <div className="u-flexbox">
                                <div className="t-product-list__filter u-flex u-margin-end-md">
                                    <div className="u-text-weight-semi-bold u-margin-bottom-sm">
                                        {products.length} Items
                                    </div>
                                    <Button
                                        className="c--tertiary u-width-full u-text-uppercase"
                                        onClick={openModal}
                                        disabled={routeName === 'searchResultPage' || activeFilters.length > 0}
                                    >
                                        Filter
                                    </Button>
                                </div>
                                <div className="t-product-list__sort u-flex">
                                    <label htmlFor="sort" className="u-text-weight-semi-bold u-margin-bottom-sm">
                                        Sort by
                                    </label>
                                    <div>
                                        <div className="u-position-relative u-width-full">
                                            <select
                                                className="t-product-list__sort-select"
                                                onChange={(e) => { sortChange(e.target.value) }}
                                                onBlur={(e) => { sortChange(e.target.value) }}
                                            >
                                                {/* This list of options corresponds to the functions in app/utils/sort-utils.js */}
                                                <option value="position">Position</option>
                                                <option value="name">Name</option>
                                                <option value="price">Price</option>
                                            </select>
                                            <div className="t-product-list__sort-icon">
                                                <Icon name="caret-down" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                :
                    <SkeletonBlock height="20px" />
                }
            </div>

            {(products.length > 0 || !contentsLoaded) ?
                <ResultList products={products} />
            :
                <NoResultsList routeName={routeName} />
            }
        </div>
    </div>
)


ProductListContents.propTypes = {
    products: PropTypes.array.isRequired,
    activeFilters: PropTypes.array,
    clearFilters: PropTypes.func,
    contentsLoaded: PropTypes.bool,
    numItems: PropTypes.number,
    openModal: PropTypes.func,
    routeName: PropTypes.string,
    sortChange: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    contentsLoaded: selectors.getProductListContentsLoaded,
    numItems: getCategoryItemCount,
    activeFilters: selectors.getActiveFilters,
    products: selectors.getFilteredAndSortedListProducts
})

const mapDispatchToProps = {
    clearFilters: () => changeFilterTo(null),
    openModal: () => openModal(PRODUCT_LIST_FILTER_MODAL),
    sortChange: changeSort,
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductListContents)
