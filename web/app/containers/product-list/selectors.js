/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector, createHasSelector} from 'reselect-immutable-helpers'
import {getUi, getCategories, getProducts} from '../../store/selectors'
import * as appSelectors from '../app/selectors'
import {PLACEHOLDER} from '../app/constants'
import {byFilters} from '../../utils/filter-utils'
import {sortLib} from '../../utils/sort-utils'

const PLACEHOLDER_URLS = Immutable.List(new Array(5).fill(PLACEHOLDER))

export const getProductList = createSelector(getUi, ({productList}) => productList)

export const getSelectedCategory = createGetSelector(
    getCategories,
    appSelectors.getCurrentPathKey,
    Immutable.Map()
)

export const getProductListContentsLoaded = createHasSelector(
    getCategories,
    appSelectors.getCurrentPathKey
)

export const getProductPaths = createGetSelector(getSelectedCategory, 'products', PLACEHOLDER_URLS)
export const getNumItems = createGetSelector(getSelectedCategory, 'itemCount')
export const getHasProducts = createSelector(getNumItems, (count) => count > 0)
export const getProductListTitle = createGetSelector(getSelectedCategory, 'title')
export const getSearchResultTerm = createGetSelector(getSelectedCategory, 'searchTerm')
export const getNoResultsText = createGetSelector(getSelectedCategory, 'noResultsText')
export const getProductListProducts = createSelector(
    getProducts,
    getProductPaths,
    (products, productUrls) => productUrls.map((path) => products.get(path))
)

export const getFilters = createGetSelector(getSelectedCategory, 'filters', Immutable.List())
export const getActiveFilters = createSelector(
    getFilters,
    (filters) => {
        let activeFilters = Immutable.List()

        filters.forEach((filter) => {
            activeFilters = activeFilters.concat(
                filter.get('kinds').filter((kind) => kind.get('active'))
            )
        })

        return activeFilters
    }
)
export const getFilteredProductListProducts = createSelector(
    getProductListProducts,
    getActiveFilters,
    (products, filters) => {
        const filteredProducts = products.toJS().filter(byFilters(filters.toJS()))
        return Immutable.List(filteredProducts)
    }
)

export const getSort = createGetSelector(getSelectedCategory, 'sort', Immutable.Map())

export const getFilteredAndSortedListProducts = createSelector(
    getFilteredProductListProducts,
    getSort,
    (products, sort) => {
        const arrayOfProducts = products.toJS()
        const options = sort.get('options')

        if (arrayOfProducts < 1) {
            return []
        }

        if (!options) {
            return arrayOfProducts
        }
        const activeSort = options.find((option) => option.get('selected'))
        return arrayOfProducts.sort(sortLib[activeSort.get('value')])
    }
)
