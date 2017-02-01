import {createSelector} from 'reselect'
import Immutable from 'immutable'
import {createGetSelector} from '../../utils/selector-utils'
import * as globalSelectors from '../../store/selectors'
import * as appSelectors from '../app/selectors'

const PLACEHOLDER_BREADCRUMBS = Immutable.fromJS([
    {
        text: 'Home',
        href: '/'
    },
    {
        text: '...'
    }
])

export const getPdp = createSelector(
    globalSelectors.getUi,
    ({pdp}) => pdp
)

export const getSelectedPdp = createSelector(
    getPdp,
    appSelectors.getCurrentUrl,
    (pdp, url) => pdp.get(url, Immutable.Map())
)

export const getSelectedProduct = createSelector(
    globalSelectors.getProducts,
    appSelectors.getCurrentPathKey,
    (products, pdpSelector) => products.get(pdpSelector, Immutable.Map())
)

export const getItemQuantity = createGetSelector(getSelectedPdp, 'itemQuantity')
export const getItemAddedModalOpen = globalSelectors.isModalOpen('pdp-item-added')
export const getFormInfo = createGetSelector(getSelectedPdp, 'formInfo')
export const getPdpContentsLoaded = createGetSelector(getSelectedPdp, 'contentsLoaded')

export const getPdpBreadcrumbs = createSelector(
    getSelectedPdp,
    (pdp) => pdp.get('breadcrumbs', PLACEHOLDER_BREADCRUMBS)
)
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
