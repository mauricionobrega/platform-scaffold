import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector, createHasSelector} from 'reselect-immutable-helpers'
import {getUi, getCategories, getProducts} from '../../store/selectors'
import {getCurrentPathKey} from '../app/selectors'
import {PLACEHOLDER} from '../app/constants'
import {byFilters} from '../../utils/filter-utils'
import {sortLib} from '../../utils/sort-utils'

const PLACEHOLDER_URLS = Immutable.List(new Array(5).fill(PLACEHOLDER))

export const getProductList = createSelector(getUi, ({productList}) => productList)

export const getCurrentProductList = createGetSelector(
    getProductList,
    getCurrentPathKey,
    Immutable.Map()
)

export const getCurrentSort = createGetSelector(getCurrentProductList, 'sort')

export const getSelectedCategory = createGetSelector(
    getCategories,
    getCurrentPathKey,
    Immutable.Map()
)

export const getProductListContentsLoaded = createHasSelector(
    getCategories,
    getCurrentPathKey
)

export const getProductPaths = createGetSelector(getSelectedCategory, 'products', PLACEHOLDER_URLS)
export const getNumItems = createGetSelector(getSelectedCategory, 'itemCount')
export const getProductListTitle = createGetSelector(getSelectedCategory, 'title')
export const getProductListParentHref = createGetSelector(getSelectedCategory, 'parentHref', '/')
export const getProductListParentName = createGetSelector(getSelectedCategory, 'parentName', 'Home')

export const getSort = createGetSelector(getSelectedCategory, 'sort', Immutable.Map())

export const getProductListProducts = createSelector(
    getProducts,
    getProductPaths,
    (products, productUrls) => productUrls.map((path) => products.get(path))
)

export const getFilters = createGetSelector(getSelectedCategory, 'filters', Immutable.List())
export const getActiveFilters = createSelector(
    getFilters,
    (filters) => (
        filters.reduce((activeFilters, filter) => activeFilters.concat(
            filter.get('kinds').filter((kind) => kind.get('active'))
        ), Immutable.List())
    )
)
export const getFilteredProductListProducts = createSelector(
    getProductListProducts,
    getActiveFilters,
    (products, filters) => products.filter(byFilters(filters.toJS()))
)

export const getFilteredAndSortedListProducts = createSelector(
    getFilteredProductListProducts,
    getCurrentSort,
    (products, sort) => {
        return sort ? products.sort(sortLib[sort]) : products
    }
)
