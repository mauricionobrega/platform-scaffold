import {createSelector} from 'reselect'
import Immutable from 'immutable'
import {createGetSelector, createHasSelector} from 'reselect-immutable-helpers'
import {getUi, getProducts} from '../../store/selectors'
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

export const getProductDetailsByPathKey = (pathKey) => createGetSelector(getProductDetails, pathKey, Immutable.Map())


export const getProductDetailsContentsLoaded = createHasSelector(
    getProductDetails,
    appSelectors.getCurrentPathKey
)

export const getSelectedProduct = createGetSelector(
    getProducts,
    appSelectors.getCurrentPathKey,
    Immutable.Map()
)

export const getAddToCartInProgress = createGetSelector(getProductDetails, 'addToCartInProgress', false)
export const getAddToCartDisabled = createSelector(
    getProductDetailsContentsLoaded,
    getAddToCartInProgress,
    (contentsLoaded, addToCartInProgress) => !contentsLoaded || addToCartInProgress
)

export const getItemQuantity = createGetSelector(getSelectedProductDetails, 'itemQuantity')
export const getCTAText = createGetSelector(getSelectedProductDetails, 'ctaText', 'Add To Cart')

export const getProductDetailsBreadcrumbs = createGetSelector(
    getSelectedProductDetails,
    'breadcrumbs',
    PLACEHOLDER_BREADCRUMBS
)
export const getProductTitle = createGetSelector(getSelectedProduct, 'title')
export const getProductPrice = createGetSelector(getSelectedProduct, 'price')
export const getProductDescription = createGetSelector(getSelectedProduct, 'description')
export const getProductImages = createGetSelector(getSelectedProduct, 'images', Immutable.List())
export const getProductThumbnail = createGetSelector(getSelectedProduct, 'thumbnail', Immutable.Map())

export const getProductVariationCategories = createGetSelector(getSelectedProduct, 'variationCategories', Immutable.List())
export const getProductVariations = createGetSelector(getSelectedProduct, 'availableVariations')
export const getProductInitialValues = createGetSelector(getSelectedProduct, 'initialValues')

export const getUenc = (pathKey) => createGetSelector(getProductDetailsByPathKey(pathKey), 'uenc')
