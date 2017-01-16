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

export const getPlpProducts = createSelector(
    globalSelectors.getCatalogProducts,
    getProductUrls,
    (products, productUrls) => productUrls.map((url) => products.get(url))
)
