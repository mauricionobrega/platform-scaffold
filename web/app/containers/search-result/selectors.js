import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi, getProducts} from '../../store/selectors'
import {getSelectedCategory} from '../product-list/selectors'
import {PLACEHOLDER} from '../app/constants'

const PLACEHOLDER_URLS = Immutable.List(new Array(5).fill(PLACEHOLDER))

export const getSearchResult = createSelector(
    getUi,
    ({searchResult}) => searchResult
)

export const getSearchResultTitle = createGetSelector(getSelectedCategory, 'title')

export const getProductPaths = createGetSelector(getSelectedCategory, 'products', PLACEHOLDER_URLS)

export const getNoResultsText = createGetSelector(getSelectedCategory, 'noResultsText')

export const getSearchResultProducts = createSelector(
    getProducts,
    getProductPaths,
    (products, productUrls) => productUrls.map((path) => products.get(path))
)

export const getHasProducts = createSelector(
    getProductPaths,
    (paths) => paths.size > 0
)
