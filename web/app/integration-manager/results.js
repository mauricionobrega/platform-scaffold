/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'

export const receiveHomeData = createAction('Receive Home Data')
export const receiveNavigationData = createAction('Receive Navigation Data')
export const receiveCategory = createAction('Receive Category Data')
export const setPageFetchError = createAction('Set page fetch error', ['fetchError'])
export const setLoggedIn = createAction('Set Logged in flag', ['isLoggedIn'])
export const setNavigationAccountLink = createAction('Set Navigation Account Link Text')
export const setCheckoutShippingURL = createAction('Set Checkout Shipping URL', ['checkoutShippingURL'])
export const setCartURL = createAction('Set Cart URL', ['cartURL'])
export const receiveOrderConfirmationContents = createAction('Receive Order Confirmation Contents')
export const receiveSearchSuggestions = createAction('Receive search suggestions')
export const setCurrentURL = createAction('Set Current URL', ['currentURL'])
