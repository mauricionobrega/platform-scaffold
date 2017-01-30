import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import * as globalSelectors from '../../store/selectors'
import * as appSelectors from '../app/selectors'
import {PLACEHOLDER} from '../app/constants'

const PLACEHOLDER_URLS = Immutable.List(new Array(5).fill(PLACEHOLDER))

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
    (paths) => paths.size > 0
)

export const getNumItems = createGetSelector(getSelectedCategory, 'itemCount')
export const getPlpTitle = createGetSelector(getSelectedCategory, 'title')
export const getNoResultsText = createGetSelector(getSelectedCategory, 'noResultsText')

export const getPlpProducts = createSelector(
    globalSelectors.getProducts,
    getProductPaths,
    (products, productUrls) => productUrls.map((path) => products.get(path))
)
