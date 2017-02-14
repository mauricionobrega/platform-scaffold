import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector, createHasSelector} from '../../utils/selector-utils'
import {getUi, getCategories, getProducts} from '../../store/selectors'
import * as appSelectors from '../app/selectors'
import {PLACEHOLDER} from '../app/constants'

const PLACEHOLDER_URLS = Immutable.List(new Array(5).fill(PLACEHOLDER))

export const getPlp = createSelector(getUi, ({plp}) => plp)

export const getSelectedCategory = createGetSelector(
    getCategories,
    appSelectors.getCurrentPathKey,
    Immutable.Map()
)

export const getPlpContentsLoaded = createHasSelector(
    getCategories,
    appSelectors.getCurrentPathKey
)

export const getProductPaths = createGetSelector(getSelectedCategory, 'products', PLACEHOLDER_URLS)

export const getHasProducts = createSelector(
    getProductPaths,
    (paths) => paths.size > 0
)

export const getNumItems = createGetSelector(getSelectedCategory, 'itemCount')
export const getPlpTitle = createGetSelector(getSelectedCategory, 'title')
export const getNoResultsText = createGetSelector(getSelectedCategory, 'noResultsText')

export const getPlpProducts = createSelector(
    getProducts,
    getProductPaths,
    (products, productUrls) => productUrls.map((path) => products.get(path))
)
