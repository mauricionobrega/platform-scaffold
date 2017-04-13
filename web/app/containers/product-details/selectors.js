import {createSelector} from 'reselect'
import Immutable from 'immutable'
import {createGetSelector, createHasSelector} from 'reselect-immutable-helpers'
import {getUi, getProducts} from '../../store/selectors'
import * as appSelectors from '../app/selectors'
import {getFormValues} from '../../store/form/selectors'

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
export const getProductVariationCategoryIds = createSelector(
    getProductVariationCategories,
    (categories) => categories.map((category) => category.get('id'))
)
export const getProductVariants = createGetSelector(getSelectedProduct, 'variants')
export const getProductInitialValues = createGetSelector(getSelectedProduct, 'initialValues')

export const getAddToCartFormValues = getFormValues('product-add-to-cart')
// NOTE: These get-something-ByPathKey selectors should only be used within actions/commands
// Using them within a component will break the performance optimizations selectors normally give us
export const getProductDetailsByPathKey = (pathKey) => createGetSelector(getProducts, pathKey, Immutable.Map())
export const getProductThumbnailByPathKey = (pathKey) => createGetSelector(getProductDetailsByPathKey(pathKey), 'thumbnail', Immutable.Map())
export const getProductThumbnailSrcByPathKey = (pathKey) => createGetSelector(getProductThumbnailByPathKey(pathKey), 'img')
