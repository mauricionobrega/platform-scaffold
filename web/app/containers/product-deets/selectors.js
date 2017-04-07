import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector, createHasSelector} from 'reselect-immutable-helpers'
import {getUi, getProducts} from '../../store/selectors'
import * as appSelectors from '../app/selectors'

export const getProductDeets = createSelector(getUi, ({productDeets}) => productDeets)

export const getSelectedProductDeets = createGetSelector(
    getProductDeets,
    appSelectors.getCurrentPathKey,
    Immutable.Map()
)

export const getSelectedProduct = createGetSelector(
    getProducts,
    appSelectors.getCurrentPathKey,
    Immutable.Map()
)

export const getCTAText = createGetSelector(getSelectedProductDeets, 'ctaText', 'ADDD')

export const getProductTitle = createGetSelector(getSelectedProduct, 'title')
export const getProductPrice = createGetSelector(getSelectedProduct, 'price')
export const getProductDescription = createGetSelector(getSelectedProduct, 'description')
export const getProductDeetsContentsLoaded = createHasSelector(
    getProductDeets,
    appSelectors.getCurrentPathKey
)
export const getProductCarouselItems = createGetSelector(getSelectedProduct, 'carouselItems', Immutable.List())
export const getFirstProductCarouselItem = createGetSelector(
    getProductCarouselItems,
    0,
    Immutable.Map()
)
export const getFirstProductImage = createGetSelector(getFirstProductCarouselItem, 'img')
