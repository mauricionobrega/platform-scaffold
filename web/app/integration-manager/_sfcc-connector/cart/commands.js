/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {makeApiRequest, makeApiJsonRequest, getAuthTokenPayload} from '../utils'
import {populateLocationsData} from '../checkout/utils'
import {requestCartData, createBasket, handleCartData} from './utils'

export const getCart = () => (dispatch) =>
    requestCartData().then((basket) => dispatch(handleCartData(basket)))


export const addToCart = (productId, quantity) => (dispatch) => (
    createBasket()
        .then((basket) => {
            const requestBody = [{
                product_id: productId,
                quantity
            }]

            return makeApiJsonRequest(`/baskets/${basket.basket_id}/items`, requestBody, {method: 'POST'})
        })
        .catch(() => { throw new Error('Unable to add item to cart') })
        .then((basket) => dispatch(handleCartData(basket)))
)

export const removeFromCart = (itemId) => (dispatch) => (
    createBasket()
        .then((basket) => makeApiRequest(`/baskets/${basket.basket_id}/items/${itemId}`, {method: 'DELETE'}))
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('Unable to remove item')
        })
        .then((basket) => dispatch(handleCartData(basket)))
)

export const updateItemQuantity = (itemId, quantity) => (dispatch) => (
    createBasket()
        .then((basket) => makeApiJsonRequest(`/baskets/${basket.basket_id}/items/${itemId}`, {quantity}, {method: 'PATCH'}))
        .catch(() => { throw new Error('Unable to update item') })
        .then((basket) => dispatch(handleCartData(basket)))
)

export const initCartPage = () => (dispatch) => Promise.resolve(dispatch(populateLocationsData()))

const NEW_WISHILIST_PAYLOAD = {
    type: 'wish_list',
    name: 'Saved for Later'
}

export const addToWishlist = (productId) => (dispatch) => {
    const {sub} = getAuthTokenPayload()
    const customerID = JSON.parse(sub).customer_info.customer_id

    return makeApiRequest(`/customers/${customerID}/product_lists`, {method: 'GET'})
        .then((response) => response.json())
        .then(({count, data}) => {
            if (count) {
                return data[0]
            }
            // create a list if one doesn't exist
            return makeApiJsonRequest(
                `/customers/${customerID}/product_lists`,
                NEW_WISHILIST_PAYLOAD,
                {method: 'POST'}
            )
        })
        .then(({id}) => {
            const requestBody = {
                type: 'product',
                product_id: productId,
                quantity: 1
            }

            return makeApiJsonRequest(
                `/customers/${customerID}/product_lists/${id}/items`,
                requestBody,
                {method: 'POST'}
            )
        })
        .catch(() => { throw new Error('Unable to add item to wishlist.') })
}

export const fetchTaxEstimate = () => Promise.reject('Method not implemented')
