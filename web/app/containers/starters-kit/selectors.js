import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import {getProducts, getUi} from '../../store/selectors'
import {getSelectedCategory} from '../plp/selectors'
import {PLACEHOLDER} from '../app/constants'

const PLACEHOLDER_URLS = Immutable.List(new Array(5).fill(PLACEHOLDER))

export const getStartersKit = createSelector(
    getUi,
    ({startersKit}) => startersKit
)

export const getDescription = createGetSelector(getStartersKit, 'description')
export const getText = createGetSelector(getStartersKit, 'text', Immutable.List())
export const getTitle = createGetSelector(getSelectedCategory, 'title')

// Products
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
