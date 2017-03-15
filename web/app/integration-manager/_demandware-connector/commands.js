import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'

import {receiveCartContents} from '../../store/cart/actions'
import {parseBasketContents, getCurrentProductID} from './parsers'

import {API_END_POINT_URL} from './constants'
import {requestHeaders, getBasketID} from './app/commands'

import * as homeCommands from './home/commands'
import * as productsCommands from './products/commands'
import * as categoriesCommands from './categories/commands'

export const addToCart = () => (dispatch) => {
    const options = {
        method: 'POST',
        headers: requestHeaders,
        body: `[{product_id: "${getCurrentProductID()}" , quantity: 1.00}]`
    }

    return getBasketID()
        .then((basketID) => {
            // TO DO: Add error handling here
            return makeRequest(`${API_END_POINT_URL}/baskets/${basketID}/items`, options)
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error('Unable to add item to cart')
                })
                .then((responseJSON) => dispatch(receiveCartContents(parseBasketContents(responseJSON))))
                .catch((error) => {
                    throw error
                })
        })
}

const fetchCheckoutShippingData = () => {
    console.log('Fetch checkout shipping data')
}

const submitShipping = () => {
    console.log('submit shipping form')
}

const checkCustomerEmail = () => {
    console.log('Check customer email')
}

const submitSignIn = () => {
    console.log('Submit sign in form')
}

export default {
    // These individual commands are temporary until we can refactor them into the
    // sub-areas they belong in.
    fetchCheckoutShippingData,
    addToCart,
    submitShipping,
    checkCustomerEmail,
    submitSignIn,

    home: homeCommands,
    productDetails: productsCommands,
    categories: categoriesCommands
}
