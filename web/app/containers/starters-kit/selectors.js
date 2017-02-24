import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import {getCategories, getProducts, getUi} from '../../store/selectors'
import * as appSelectors from '../app/selectors'
import {PLACEHOLDER} from '../app/constants'

const PLACEHOLDER_URLS = Immutable.List(new Array(5).fill(PLACEHOLDER))

export const getStartersKit = createSelector(
    getUi,
    ({startersKit}) => startersKit
)

export const getDescription = createGetSelector(getStartersKit, 'description')
export const getTitle = createGetSelector(getStartersKit, 'title')
export const getText = createGetSelector(getStartersKit, 'text', Immutable.List())


export const getStarterKitCategory = createGetSelector(
    getCategories,
    appSelectors.getCurrentPathKey,
    // '/starters-kit/', // TODO if broken, look here
    Immutable.Map()
)

export const getProductPaths = createGetSelector(getStarterKitCategory, 'products', PLACEHOLDER_URLS)

export const getStartersKitProducts = createSelector(
    getProducts,
    getProductPaths,
    (products, productUrls) => productUrls.map((path) => products.get(path))
)

export const getHasProducts = createSelector(
    getProductPaths,
    (paths) => paths.size > 0
)
