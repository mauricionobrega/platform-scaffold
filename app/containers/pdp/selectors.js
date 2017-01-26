import {createSelector} from 'reselect'
import Immutable from 'immutable'
import {createGetSelector} from '../../utils/selector-utils'
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

export const getItemQuantity = createGetSelector(getSelectedPdp, 'itemQuantity')
export const getItemAddedModalOpen = globalSelectors.isModalOpen('pdp-item-added')
export const getFormInfo = createGetSelector(getSelectedPdp, 'formInfo')
export const getPdpContentsLoaded = createGetSelector(getSelectedPdp, 'contentsLoaded')

export const getProductTitle = createGetSelector(getSelectedProduct, 'title')
export const getProductPrice = createGetSelector(getSelectedProduct, 'price')
export const getProductDescription = createGetSelector(getSelectedProduct, 'description')
export const getProductCarouselItems = createGetSelector(getSelectedProduct, 'carouselItems')
export const getFirstProductCarouselItem = createSelector(
    getProductCarouselItems,
    (carouselItems) => carouselItems.get(0, Immutable.Map())
)
export const getFirstProductImage = createGetSelector(getFirstProductCarouselItem, 'img')
