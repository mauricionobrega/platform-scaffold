import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import * as globalSelectors from '../../store/selectors'
import * as appSelectors from '../app/selectors'
import {PLACEHOLDER} from '../app/constants'

const PLACEHOLDER_URLS = Immutable.List(new Array(5).fill(PLACEHOLDER))


// This is temporary for while the PDP/product data is still keyed by the full URL
const pathToSelector = (path) => `https://www.merlinspotions.com${path}`

export const getCatalogProducts = globalSelectors.getCatalogProducts

export const getPlp = createSelector(
    globalSelectors.getUi,
    ({plp}) => plp
)

export const getSelectedCategory = createSelector(
    globalSelectors.getCategories,
    appSelectors.getCurrentPathKey,
    (categories, selectorPath) => categories.get(selectorPath, Immutable.Map())
)

export const getPlpContentsLoaded = createSelector(
    globalSelectors.getCategories,
    appSelectors.getCurrentPathKey,
    (categories, path) => categories.has(path)
)

export const getProductPaths = createSelector(
    getSelectedCategory,
    (category) => category.get('products', PLACEHOLDER_URLS)
)
export const getHasProducts = createSelector(
    getProductPaths,
    (urls) => urls.size > 0
)
export const getProductUrls = createSelector(
    getProductPaths,
    (paths) => paths.map(pathToSelector)
)

export const getNumItems = createGetSelector(getSelectedCategory, 'itemCount')
export const getPlpTitle = createGetSelector(getSelectedCategory, 'title')
export const getNoResultsText = createGetSelector(getSelectedCategory, 'noResultsText')

export const getPlpProducts = createSelector(
    globalSelectors.getCatalogProducts,
    getProductUrls,
    (products, productUrls) => productUrls.map((url) => products.get(url))
)
