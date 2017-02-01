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
    appSelectors.getCurrentPathKey,
    (pdp, path) => pdp.get(path, Immutable.Map())
)
export const getPdpContentsLoaded = createSelector(
    getPdp,
    appSelectors.getCurrentPathKey,
    (pdp, path) => pdp.has(path)
)

export const getSelectedProduct = createSelector(
    globalSelectors.getProducts,
    appSelectors.getCurrentPathKey,
    (products, path) => products.get(path, Immutable.Map())
)

export const getItemQuantity = createSelector(
    getSelectedPdp,
    (pdp) => pdp.get('itemQuantity', 1)
)
export const getItemAddedModalOpen = globalSelectors.isModalOpen('pdp-item-added')
export const getFormInfo = createGetSelector(getSelectedPdp, 'formInfo')

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
