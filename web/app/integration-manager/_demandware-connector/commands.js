import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'

import {receiveCartContents} from '../../store/cart/actions'
import {parseBasketContents, getCurrentProductID} from './parsers'

import {API_END_POINT_URL} from './constants'

import * as homeCommands from './home/commands'
import * as productsCommands from './products/commands'
import * as categoriesCommands from './categories/commands'
import * as cartCommands from './cart/commands'
import * as appCommands from './app/commands'

const addToCart = () => (dispatch) => {
    let headers
    return appCommands.initDemandWareSession()
        .then((requestHeaders) => {
            headers = requestHeaders
            return cartCommands.getBasketID(headers)
        })
        .then((basketID) => {
            const options = {
                method: 'POST',
                headers,
                body: JSON.stringify([{
                    product_id: getCurrentProductID().toString(),
                    quantity: 1.00
                }])
            }
            return makeRequest(`${API_END_POINT_URL}/baskets/${basketID}/items`, options)
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error('Unable to add item to cart')
                })
                .then((responseJSON) => dispatch(receiveCartContents(parseBasketContents(responseJSON))))
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
    products: productsCommands,
    categories: categoriesCommands,
    cart: cartCommands,
    app: appCommands
}
