import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getSearchResult, getProducts} from '../../store/selectors'
// import {byFilters} from '../../utils/filter-utils'
import {PLACEHOLDER} from '../app/constants'

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


// FILTERING
// ---
// export const getFilters = createGetSelector(getSelectedCategory, 'filters', Immutable.List())
// export const getActiveFilters = createSelector(
//     getFilters,
//     (filters) => {
//         let activeFilters = Immutable.List()
//
//         filters.forEach((filter) => {
//             activeFilters = activeFilters.concat(
//                 filter.get('kinds').filter((kind) => kind.get('active'))
//             )
//         })
//
//         return activeFilters
//     }
// )

export const getFilteredSearchResultProducts = createSelector(
    getSearchResultProducts,
    // getActiveFilters,
    (products) => {
        // const filteredProducts = products.toJS().filter(byFilters(filters.toJS()))
        // return Immutable.List(filteredProducts)
        return products
    }
)

// SORTING
// ---
// export const getSort = createGetSelector(getSelectedCategory, 'sort', Immutable.Map())

export const getFilteredAndSortedListProducts = createSelector(
    getFilteredSearchResultProducts,
    // getSort,
    (products) => {
        // const arrayOfProducts = products.toJS()
        // const options = sort.get('options')
        //
        // if (!options) {
        //     return arrayOfProducts
        // }
        // const activeSort = options.find((option) => option.get('selected'))
        // return arrayOfProducts.sort(sortLib[activeSort.get('value')])

        return products
    }
)
