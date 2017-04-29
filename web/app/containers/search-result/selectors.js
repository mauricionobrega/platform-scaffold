import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getSearchResult, getProducts} from '../../store/selectors'
import {PLACEHOLDER} from '../app/constants'

import {sortLib} from '../../utils/sort-utils'

const PLACEHOLDER_URLS = Immutable.List(new Array(5).fill(PLACEHOLDER))


// PAGE INFORMATION
export const getSearchResultTerm = createGetSelector(getSearchResult, 'searchTerm')
export const getProductPaths = createGetSelector(getSearchResult, 'products', PLACEHOLDER_URLS)
export const getHasProducts = createSelector(
    getProductPaths,
    (products) => products.size > 0
)
export const getSearchResultProducts = createSelector(
    getProducts,
    getProductPaths,
    (products, productUrls) => {
        return productUrls.map((path) => {
            return products.get(path)
        })
    }
)

export const getSort = createGetSelector(getSearchResult, 'sort', Immutable.Map())
export const getFilteredAndSortedSearchResultListProducts = createSelector(
    getSearchResultProducts,
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
