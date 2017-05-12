/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createSelector} from 'reselect'
import Immutable from 'immutable'
import {createGetSelector, createHasSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'
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

export const getAddToCartInProgress = createGetSelector(getProductDetails, 'addToCartInProgress', false)
export const getAddToCartDisabled = createSelector(
    getProductDetailsContentsLoaded,
    getAddToCartInProgress,
    (contentsLoaded, addToCartInProgress) => !contentsLoaded || addToCartInProgress
)

export const getItemQuantity = createGetSelector(getSelectedProductDetails, 'itemQuantity')

export const getProductDetailsBreadcrumbs = createGetSelector(
    getSelectedProductDetails,
    'breadcrumbs',
    PLACEHOLDER_BREADCRUMBS
)

export const getAddToCartFormValues = getFormValues('product-add-to-cart')
