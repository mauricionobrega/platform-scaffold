import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import * as globalSelectors from '../../store/selectors'
import {getSelectorFromState} from '../../utils/router-utils'

export const getCatalogProducts = globalSelectors.getCatalogProducts

export const getPlp = createSelector(
    globalSelectors.getUi,
    ({plp}) => plp
)

export const getPlpSelector = createSelector(
    getPlp,
    getSelectorFromState
)

export const getSelectedPlp = createSelector(
    getPlp,
    getPlpSelector,
    (plp, plpSelector) => plp.get(plpSelector)
)

export const getProductUrls = createGetSelector(getSelectedPlp, 'productUrls')
export const getHasProducts = createSelector(
    getProductUrls,
    (urls) => urls.size > 0
)
export const getPlpContentsLoaded = createGetSelector(getSelectedPlp, 'contentsLoaded')
export const getNoResultsText = createGetSelector(getSelectedPlp, 'noResultsText')
export const getNumItems = createGetSelector(getSelectedPlp, 'numItems')
export const getPlpTitle = createGetSelector(getSelectedPlp, 'title')

export const getPlpProducts = createSelector(
    globalSelectors.getCatalogProducts,
    getProductUrls,
    (products, productUrls) => productUrls.map((url) => products.get(url))
)
