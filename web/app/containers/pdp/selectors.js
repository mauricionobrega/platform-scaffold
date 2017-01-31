import {createSelector} from 'reselect'
import Immutable from 'immutable'
import {createGetSelector} from '../../utils/selector-utils'
import * as globalSelectors from '../../store/selectors'
import {getSelectorFromState} from '../../utils/router-utils'
import {urlToPathKey} from '../../utils/utils'

export const getPdp = createSelector(
    globalSelectors.getUi,
    ({pdp}) => pdp
)

export const getPdpSelector = createSelector(
    getPdp,
    getSelectorFromState
)

export const getPdpSelectorPath = createSelector(
    getPdpSelector,
    urlToPathKey
)

export const getSelectedPdp = createSelector(
    getPdp,
    getPdpSelector,
    (pdp, pdpSelector) => pdp.get(pdpSelector)
)

export const getSelectedProduct = createSelector(
    globalSelectors.getProducts,
    getPdpSelectorPath,
    (products, pdpSelector) => products.get(pdpSelector, Immutable.Map())
)

export const getItemQuantity = createGetSelector(getSelectedPdp, 'itemQuantity')
export const getItemAddedModalOpen = globalSelectors.isModalOpen('pdp-item-added')
export const getFormInfo = createGetSelector(getSelectedPdp, 'formInfo')
export const getPdpContentsLoaded = createGetSelector(getSelectedPdp, 'contentsLoaded')

export const getPdpBreadcrumbs = createGetSelector(getSelectedPdp, 'breadcrumbs')
export const getProductTitle = createGetSelector(getSelectedProduct, 'title')
export const getProductPrice = createGetSelector(getSelectedProduct, 'price')
export const getProductDescription = createGetSelector(getSelectedProduct, 'description')
export const getProductCarouselItems = createSelector(
    getSelectedProduct,
    (product) => product.get('carouselItems', Immutable.List())
)
export const getFirstProductCarouselItem = createSelector(
    getProductCarouselItems,
    (carouselItems) => carouselItems.get(0, Immutable.Map())
)
export const getFirstProductImage = createGetSelector(getFirstProductCarouselItem, 'img')
