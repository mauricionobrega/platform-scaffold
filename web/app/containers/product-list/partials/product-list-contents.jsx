/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as selectors from '../selectors'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import {PRODUCT_LIST_FILTER_MODAL} from '../constants'
import {openModal} from '../../../store/modals/actions'
import {changeFilterTo, changeSort} from '../../../store/categories/actions'

import Button from 'progressive-web-sdk/dist/components/button'
import List from 'progressive-web-sdk/dist/components/list'
import Image from 'progressive-web-sdk/dist/components/image'
import Icon from 'progressive-web-sdk/dist/components/icon'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

import ProductTile from '../../../components/product-tile'

const ResultList = ({products}) => (
    <List className="c--borderless">
        {products.map((product) => {
            return <ProductTile key={product.title} {...product} />
        })}
    </List>
)

ResultList.propTypes = {
    products: PropTypes.array
}

const NoResultsList = ({bodyText, routeName}) => (
    <div className="u-flexbox u-direction-column u-align-center">
        <Image
            className="u-flex-none"
            alt="Crystal Ball"
            width="122px"
            height="110px"
            src={getAssetUrl('static/img/global/no-results.png')}
        />

        <div className="t-product-list__no-results-text u-text-align-center">
            {routeName === 'searchResultPage' ?
                <div>
                    Your search returned no results. Please check your spelling and try searching again.
                </div>
            :
                <div>{bodyText}</div>
            }

        </div>
    </div>
)

NoResultsList.propTypes = {
    bodyText: PropTypes.string,
    routeName: PropTypes.string
}

const ProductListContents = ({
    activeFilters,
    clearFilters,
    contentsLoaded,
    hasProducts,
    noResultsText,
    products,
    openModal,
    sort,
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
                        {hasProducts &&
                            <div className="u-flexbox">
                                <div className="t-product-list__filter u-flex u-margin-end-md">
                                    <div className="u-text-semi-bold u-margin-bottom-sm">
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
                                    <label htmlFor="sort" className="u-text-semi-bold u-margin-bottom-sm">
                                        Sort by
                                    </label>

                                    <div>
                                        <div className="u-position-relative u-width-full">
                                            <select
                                                className="t-product-list__sort-select"
                                                onChange={(e) => { sortChange(e.target.value) }}
                                                onBlur={(e) => { sortChange(e.target.value) }}
                                            >
                                                {sort.options.map((option) =>
                                                    <option value={option.value} key={option.value}>
                                                        {option.text}
                                                    </option>)
                                                }
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

            {(hasProducts || !contentsLoaded) ?
                <ResultList products={products} />
            :
                <NoResultsList routeName={routeName} bodyText={noResultsText} />
            }
        </div>
    </div>
)


ProductListContents.propTypes = {
    products: PropTypes.array.isRequired,
    activeFilters: PropTypes.array,
    clearFilters: PropTypes.func,
    contentsLoaded: PropTypes.bool,
    hasProducts: PropTypes.bool,
    noResultsText: PropTypes.string,
    openModal: PropTypes.func,
    routeName: PropTypes.string,
    sort: PropTypes.object,
    sortChange: PropTypes.func,
}

const mapStateToProps = createPropsSelector({
    activeFilters: selectors.getActiveFilters,
    hasProducts: selectors.getHasProducts,
    contentsLoaded: selectors.getProductListContentsLoaded,
    noResultsText: selectors.getNoResultsText,
    products: selectors.getFilteredAndSortedListProducts,
    sort: selectors.getSort
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
