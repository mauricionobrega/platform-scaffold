import {createSelector} from 'reselect'
import * as globalSelectors from '../../store/selectors'
import {SELECTOR} from '../app/constants'

export const getPdp = createSelector(
    globalSelectors.getUi,
    ({pdp}) => pdp
)

export const getPdpSelector = createSelector(
    getPdp,
    (pdp) => pdp.get(SELECTOR)
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
