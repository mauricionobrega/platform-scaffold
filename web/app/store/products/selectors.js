import {createSelector} from 'reselect'
import Immutable from 'immutable'
import {createGetSelector} from 'reselect-immutable-helpers'

import {getProducts} from '../selectors'
import {getCurrentPathKey} from '../../containers/app/selectors'

export const getSelectedProduct = createGetSelector(getProducts, getCurrentPathKey, Immutable.Map())

export const getSelectedProductId = createGetSelector(getSelectedProduct, 'id')
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

// NOTE: These get-something-ByPathKey selectors should only be used within actions/commands
// Using them within a component will break the performance optimizations selectors normally give us
export const getProductDetailsByPathKey = (pathKey) => createGetSelector(getProducts, pathKey, Immutable.Map())
export const getProductThumbnailByPathKey = (pathKey) => createGetSelector(getProductDetailsByPathKey(pathKey), 'thumbnail', Immutable.Map())
export const getProductThumbnailSrcByPathKey = (pathKey) => createGetSelector(getProductThumbnailByPathKey(pathKey), 'img')

export const getProductById = (productId) => createSelector(
    getProducts,
    (products) => products.find((product) => product.get('id') === productId)
)
