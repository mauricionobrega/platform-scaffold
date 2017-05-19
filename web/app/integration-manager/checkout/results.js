/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction, createActionWithAnalytics} from 'progressive-web-sdk/dist/utils/action-creation'
import {EVENT_ACTION, Transaction, Product} from 'progressive-web-sdk/dist/analytics/data-objects/'
import {getCartItems, getOrderTotal, getTaxes} from '../../store/cart/selectors'

export const receiveCheckoutData = createAction('Receive Checkout Data')
export const receiveShippingInitialValues = createAction('Receive Shipping Initial Values', ['shipping'])
export const receiveHasExistingCard = createAction('Receive Has Existing Cart flag', ['hasExistingCreditCard'])
export const receiveBillingInitialValues = createAction('Receive Billing Initial Values', ['billing'])

const remapProducts = (products) => {
    const mappedProducts = []
    products.forEach((product) => {
        const detail = product.product
        mappedProducts.push({
            [Product.ID]: detail.id,
            [Product.NAME]: detail.title,
            [Product.PRICE]: detail.price,
            [Product.QUANTITY]: product.quantity
        })
    })
    return mappedProducts
}

const realReceiveCheckoutConfirmationData = createActionWithAnalytics(
    'Receive Checkout Confirmation Data',
    ['confirmationData', 'purchaseData'],
    EVENT_ACTION.purchase,
    (confirmationData, purchaseData) => {
        return new Transaction(
            {
                [Transaction.ID]: confirmationData.orderNumber,
                [Transaction.REVENUE]: purchaseData[Transaction.REVENUE],
                [Transaction.TAX]: purchaseData[Transaction.TAX]
            },
            purchaseData.products
        )
    }
)

// This is a proxy action to get state information before dispatching the real intended action
export const receiveCheckoutConfirmationData = (confirmationData) => (dispatch, getState) => {
    return dispatch(realReceiveCheckoutConfirmationData(confirmationData, {
        [Transaction.REVENUE]: getOrderTotal(getState()),
        [Transaction.TAX]: getTaxes(getState()),
        products: remapProducts(getCartItems(getState()).toJS())
    }))
}
