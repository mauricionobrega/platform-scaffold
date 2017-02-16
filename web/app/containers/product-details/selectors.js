import {createSelector} from 'reselect'
import Immutable from 'immutable'
import {createGetSelector, createHasSelector} from '../../utils/selector-utils'
import {getUi, getProducts, isModalOpen} from '../../store/selectors'
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

export const getProductDetails = createSelector(getUi, ({productDetails}) => productDetails)

export const getSelectedProductDetails = createGetSelector(
    getProductDetails,
    appSelectors.getCurrentPathKey,
    Immutable.Map()
)
export const getProductDetailsContentsLoaded = createHasSelector(
    getProductDetails,
    appSelectors.getCurrentPathKey
)

export const getSelectedProduct = createGetSelector(
    getProducts,
    appSelectors.getCurrentPathKey,
    Immutable.Map()
)

export const getItemQuantity = createGetSelector(getSelectedProductDetails, 'itemQuantity', 1)
export const getItemAddedModalOpen = isModalOpen('product-details-item-added')
export const getFormInfo = createGetSelector(getSelectedProductDetails, 'formInfo')

export const getProductDetailsBreadcrumbs = createGetSelector(
    getSelectedProductDetails,
    'breadcrumbs',
    PLACEHOLDER_BREADCRUMBS
)
export const getProductTitle = createGetSelector(getSelectedProduct, 'title')
export const getProductPrice = createGetSelector(getSelectedProduct, 'price')
export const getProductDescription = createGetSelector(getSelectedProduct, 'description')
export const getProductCarouselItems = createGetSelector(getSelectedProduct, 'carouselItems', Immutable.List())
export const getFirstProductCarouselItem = createGetSelector(
    getProductCarouselItems,
    0,
    Immutable.Map()
)
export const getFirstProductImage = createGetSelector(getFirstProductCarouselItem, 'img')
