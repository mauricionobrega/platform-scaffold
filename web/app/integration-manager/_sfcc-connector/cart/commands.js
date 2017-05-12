/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {makeSfccRequest, getAuthTokenPayload} from '../utils'
import {receiveCheckoutData} from '../../checkout/results'
import {requestCartData, createBasket, handleCartData} from './utils'
import {API_END_POINT_URL} from '../constants'
import {STATES} from '../checkout/constants'

export const getCart = () => (dispatch) => {
    return requestCartData()
        .then((response) => response.json())
        .then((responseJSON) => dispatch(handleCartData(responseJSON)))
}

export const addToCart = (productID, qty) => (dispatch) => {
    return createBasket()
        .then((basketID) => {
            const options = {
                method: 'POST',
                body: JSON.stringify([{
                    product_id: productID,
                    quantity: qty
                }])
            }
            return makeSfccRequest(`${API_END_POINT_URL}/baskets/${basketID}/items`, options)
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
        .then((basketID) => {
            return makeSfccRequest(`${API_END_POINT_URL}/baskets/${basketID}/items/${itemId}`, {method: 'DELETE'})
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
        .then((basketID) => {
            const requestOptions = {
                method: 'PATCH',
                body: JSON.stringify({
                    quantity: itemQuantity
                })
            }
            return makeSfccRequest(`${API_END_POINT_URL}/baskets/${basketID}/items/${itemId}`, requestOptions)
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error('Unable to update item')
                })
                .then((responseJSON) => dispatch(handleCartData(responseJSON)))
        })
}

export const fetchCartPageData = () => (dispatch) => {
    return new Promise(() => {
        dispatch(receiveCheckoutData({
            locations: {
                countries: [{value: 'us', label: 'United States'}],
                regions: STATES
            }
        }))
    })
}

export const addToWishlist = (productId) => (dispatch) => {
    const {sub} = getAuthTokenPayload()
    const customerID = JSON.parse(sub).customer_info.customer_id

    return makeSfccRequest(`${API_END_POINT_URL}/customers/${customerID}/product_lists`, {method: 'GET'})
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
            return makeSfccRequest(`${API_END_POINT_URL}/customers/${customerID}/product_lists`, requestOptions)
                .then((response) => response.json())


        })
        .then(({id}) => {
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify({
                    type: 'product',
                    product_id: productId,
                    quantity: 1
                })
            }

            return makeSfccRequest(`${API_END_POINT_URL}/customers/${customerID}/product_lists/${id}/items`, requestOptions)
                .then((response) => response.json())
                .then((responseJSON) => {
                    if (responseJSON.fault) {
                        throw new Error('Unable to add item to wishlist.')
                    }
                })
        })
}
