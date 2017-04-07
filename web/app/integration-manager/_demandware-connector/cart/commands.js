import {makeDemandwareRequest} from '../utils'
import {receiveCheckoutData} from '../../checkout/responses'
import {parseAndReceiveCartResponse, requestCartData, createBasket} from './utils'
import {getCurrentProductID} from '../parsers'
import {API_END_POINT_URL} from '../constants'
import {STATES} from '../checkout/constants'


export const getCart = () => (dispatch) => {
    return requestCartData()
        .then((response) => response.json())
        .then((responseJSON) => dispatch(parseAndReceiveCartResponse(responseJSON)))
        // .then((responseJSON) => fetchBasketItemImages(responseJSON, getState()))
        // .then((basketData) => dispatch(receiveCartContents(basketData)))
        // })
}

export const addToCart = () => (dispatch) => {
    return createBasket()
        .then((basketID) => {
            const options = {
                method: 'POST',
                body: JSON.stringify([{
                    product_id: getCurrentProductID().toString(),
                    quantity: 1.00
                }])
            }
            return makeDemandwareRequest(`${API_END_POINT_URL}/baskets/${basketID}/items`, options)
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error('Unable to add item to cart')
                })
                .then((responseJSON) => dispatch(parseAndReceiveCartResponse(responseJSON)))
                // .then((responseJSON) => cartCommands.fetchBasketItemImages(responseJSON, getState()))
                // .then((basketData) => dispatch(receiveCartContents(basketData)))
        })
}

export const removeFromCart = (itemId) => (dispatch) => {
    return createBasket()
        .then((basketID) => {
            return makeDemandwareRequest(`${API_END_POINT_URL}/baskets/${basketID}/items/${itemId}`, {method: 'DELETE'})
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error('Unable to remove item')
                })
                .then((responseJSON) => dispatch(parseAndReceiveCartResponse(responseJSON)))
                // .then((responseJSON) => fetchBasketItemImages(responseJSON, getState()))
                // .then((basketData) => dispatch(receiveCartContents(basketData)))
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
            return makeDemandwareRequest(`${API_END_POINT_URL}/baskets/${basketID}/items/${itemId}`, requestOptions)
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error('Unable to update item')
                })
                .then((responseJSON) => dispatch(parseAndReceiveCartResponse(responseJSON)))
                // .then((responseJSON) => fetchBasketItemImages(responseJSON, getState()))
                // .then((basketData) => dispatch(receiveCartContents(basketData)))
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
