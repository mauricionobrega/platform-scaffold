import {createSelector} from 'reselect'
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

export const getProductUrls = createSelector(
    getSelectedPlp,
    (plp) => plp.get('productUrls')
)

export const getPlpProducts = createSelector(
    globalSelectors.getCatalogProducts,
    getProductUrls,
    (products, productUrls) => productUrls.map((url) => products.get(url))
)
