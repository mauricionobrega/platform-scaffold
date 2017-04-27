import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi, getProducts} from '../../store/selectors'
import {getSelectedCategory} from '../product-list/selectors'
import {PLACEHOLDER} from '../app/constants'

export const getStartersKit = createSelector(getUi, ({startersKit}) => startersKit)

export const getTitle = createGetSelector(getStartersKit, 'title')
export const getText = createGetSelector(getStartersKit, 'text', Immutable.List())
export const getDescription = createGetSelector(getStartersKit, 'description')
const PLACEHOLDER_URLS = Immutable.List(new Array(5).fill(PLACEHOLDER))
export const getProductPaths = createGetSelector(getSelectedCategory, 'products', PLACEHOLDER_URLS)
export const getStartersKitProducts = createSelector(
    getProducts,
    getProductPaths,
    (products, productUrls) => productUrls.map((path) => products.get(path))
)
export const getHasProducts = createSelector(
    getProductPaths,
    (paths) => paths.size > 0
)
