import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector, createHasSelector} from 'reselect-immutable-helpers'
import {getUi, getCategories, getProducts} from '../../store/selectors'
import * as appSelectors from '../app/selectors'
import {PLACEHOLDER} from '../app/constants'

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

export const getHasProducts = createSelector(
    getProductPaths,
    (paths) => paths.size > 0
)

export const getNumItems = createGetSelector(getSelectedCategory, 'itemCount')
export const getProductListTitle = createGetSelector(getSelectedCategory, 'title')
export const getProductListParentHref = createGetSelector(getSelectedCategory, 'parentHref', '/')
export const getProductListParentName = createGetSelector(getSelectedCategory, 'parentName', 'Home')

export const getProductListProducts = createSelector(
    getProducts,
    getProductPaths,
    (products, productUrls) => productUrls.map((path) => products.get(path))
)
