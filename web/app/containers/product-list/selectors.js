import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector, createHasSelector} from 'reselect-immutable-helpers'
import {getUi, getCategories, getProducts} from '../../store/selectors'
import * as appSelectors from '../app/selectors'
import {PLACEHOLDER} from '../app/constants'
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
export const getHasProducts = createSelector(
    getNumItems,
    (count) => count > 0
)

export const getProductListTitle = createGetSelector(getSelectedCategory, 'title')
export const getNoResultsText = createGetSelector(getSelectedCategory, 'noResultsText')

export const getSort = createGetSelector(getSelectedCategory, 'sort', Immutable.List())

export const getProductListProducts = createSelector(
    getProducts,
    getProductPaths,
    (products, productUrls) => productUrls.map((path) => products.get(path))
)

export const getSortedListProducts = createSelector(
    getProductListProducts,
    getSort,
    (products, sort, activeSort) => {
        const arrayOfProducts = products.toJS()
        const options = sort.toJS().options

        if (options) {
            options.forEach((option) => {
                if (option.selected === true) {
                    activeSort = option.value
                }
                return activeSort
            })
        }
        return arrayOfProducts.sort(sortLib[activeSort])
    }
)
