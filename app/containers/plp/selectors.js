import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import * as globalSelectors from '../../store/selectors'
import {getSelectorFromState} from '../../utils/router-utils'
import {PLACEHOLDER} from '../app/constants'

const PLACEHOLDER_URLS = Immutable.List(new Array(5).fill(PLACEHOLDER))

const selectorToPath = (selector) => { return selector !== PLACEHOLDER ? new URL(selector).pathname : selector }

const pathToSelector = (path) => `https://www.merlinspotions.com${path}`

export const getCatalogProducts = globalSelectors.getCatalogProducts

export const getPlp = createSelector(
    globalSelectors.getUi,
    ({plp}) => plp
)

export const getPlpSelector = createSelector(
    getPlp,
    getSelectorFromState
)

export const getPlpSelectorPath = createSelector(
    getPlpSelector,
    selectorToPath
)

export const getSelectedPlp = createSelector(
    getPlp,
    getPlpSelector,
    (plp, plpSelector) => plp.get(plpSelector)
)

export const getSelectedCategory = createSelector(
    globalSelectors.getCategories,
    getPlpSelectorPath,
    (categories, selectorPath) => categories.get(selectorPath, Immutable.Map())
)

export const getPlpContentsLoaded = createSelector(
    globalSelectors.getCategories,
    getPlpSelectorPath,
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
