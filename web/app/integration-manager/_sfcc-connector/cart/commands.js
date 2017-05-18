/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {makeApiRequest, makeApiJsonRequest, getAuthTokenPayload} from '../utils'
import {populateLocationsData} from '../checkout/utils'
import {requestCartData, createBasket, handleCartData} from './utils'

export const getCart = () => (dispatch) =>
    requestCartData().then((basket) => dispatch(handleCartData(basket)))


export const addToCart = (productId, quantity) => (dispatch) => {
    return createBasket()
        .then((basket) => {
            const options = {
                method: 'POST',
                body: JSON.stringify([{
                    product_id: productId,
                    quantity
                }])
            }
            return makeApiRequest(`/baskets/${basket.basket_id}/items`, options)
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error('Unable to add item to cart')
                })
                .then((responseJSON) => dispatch(handleCartData(responseJSON)))
        })
}

export const removeFromCart = (itemId) => (dispatch) => {
    return createBasket()
        .then((basket) => {
            return makeApiRequest(`/baskets/${basket.basket_id}/items/${itemId}`, {method: 'DELETE'})
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error('Unable to remove item')
                })
                .then((responseJSON) => dispatch(handleCartData(responseJSON)))
        })
}

export const updateItemQuantity = (itemId, itemQuantity) => (dispatch) => {
    return createBasket()
        .then((basket) => {
            const requestOptions = {
                method: 'PATCH',
                body: JSON.stringify({
                    quantity: itemQuantity
                })
            }
            return makeApiRequest(`/baskets/${basket.basket_id}/items/${itemId}`, requestOptions)
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error('Unable to update item')
                })
                .then((responseJSON) => dispatch(handleCartData(responseJSON)))
        })
}

export const initCartPage = () => (dispatch) => {
    return new Promise(() => {
        dispatch(populateLocationsData())
    })
}

export const addToWishlist = (productId) => (dispatch) => {
    const {sub} = getAuthTokenPayload()
    const customerID = JSON.parse(sub).customer_info.customer_id

    return makeApiRequest(`/customers/${customerID}/product_lists`, {method: 'GET'})
        .then((response) => response.json())
        .then(({count, data}) => {
            if (count) {
                return Promise.resolve(data[0])
            }
            // create a list
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify({
                    type: 'wish_list',
                    name: 'Saved for Later'
                })
            }
            return makeApiRequest(`/customers/${customerID}/product_lists`, requestOptions)
                .then((response) => response.json())
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
                .catch(() => { throw new Error('Unable to add item to wishlist.') })
        })
}

export const fetchTaxEstimate = () => Promise.reject('Method not implemented')
