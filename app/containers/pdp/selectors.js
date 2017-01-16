import {createSelector} from 'reselect'
import * as globalSelectors from '../../store/selectors'
import {getSelectorFromState} from '../../utils/router-utils'

export const getPdp = createSelector(
    globalSelectors.getUi,
    ({pdp}) => pdp
)

export const getPdpSelector = createSelector(
    getPdp,
    getSelectorFromState
)

export const getSelectedPdp = createSelector(
    getPdp,
    getPdpSelector,
    (pdp, pdpSelector) => pdp.get(pdpSelector)
)

export const getSelectedProduct = createSelector(
    globalSelectors.getCatalogProducts,
    getPdpSelector,
    (products, pdpSelector) => products.get(pdpSelector)
)
