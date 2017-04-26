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
export const getProductListTitle = createGetSelector(getSelectedCategory, 'title')
export const getProductListParentHref = createGetSelector(getSelectedCategory, 'parentHref', '/')
export const getProductListParentName = createGetSelector(getSelectedCategory, 'parentName', 'Home')

export const getSort = createGetSelector(getSelectedCategory, 'sort', Immutable.Map())

export const getProductListProducts = createSelector(
    getProducts,
    getProductPaths,
    (products, productUrls) => productUrls.map((path) => products.get(path))
)

export const getSortedListProducts = createSelector(
    getProductListProducts,
    getSort,
    (products, sort) => {
        const arrayOfProducts = products.toJS()
        const options = sort.get('options')

        if (!options) {
            return arrayOfProducts
        }
        const activeSort = options.find((option) => option.get('selected'))
        return arrayOfProducts.sort(sortLib[activeSort.get('value')])
    }
)
