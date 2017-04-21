import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector, createHasSelector} from 'reselect-immutable-helpers'
import {getUi, getCategories, getProducts} from '../../store/selectors'
import * as appSelectors from '../app/selectors'
import {PLACEHOLDER} from '../app/constants'
import {byTokens, toTokens} from '../../utils/filter-utils'

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
export const getHasProducts = createSelector(
    getNumItems,
    (count) => count > 0
)

export const getProductListTitle = createGetSelector(getSelectedCategory, 'title')
export const getNoResultsText = createGetSelector(getSelectedCategory, 'noResultsText')

export const getFilters = createGetSelector(getSelectedCategory, 'filters', Immutable.List())
export const getActiveFilters = createSelector(
    getFilters,
    (filters) => {
        let activeFilters = Immutable.List()

        filters.map((filter) => filter.get('kinds').map((kind) => {
            if (kind.get('active')) {
                activeFilters = activeFilters.push(kind)
                return true
            }
            return false
        }))

        console.log(activeFilters.toJS())

        return activeFilters
    }
)

export const getProductListProducts = createSelector(
    getProducts,
    getProductPaths,
    (products, productUrls) => productUrls.map((path) => products.get(path))
)

export const getFilteredProductListProducts = createSelector(
    getProductListProducts,
    getFilters,
    (products, filters) => {
        const filterTokens = filters.toJS().reduce(toTokens, [])
        return products.toJS().filter(byTokens(filterTokens))
    }
)
