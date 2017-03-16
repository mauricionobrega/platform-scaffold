import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {receiveCartContents} from '../../store/cart/actions'
import {parseBasketContents, getCurrentProductID} from './parsers'

import {API_END_POINT_URL} from './constants'
import {requestHeaders, initDemandWareSession, getBasketID} from './app/commands'

import * as homeCommands from './home/commands'
import * as productDetailsCommands from './product-details/commands'


const addToCart = () => (dispatch) => {
    return initDemandWareSession()
        .then(getBasketID)
        .then((basketID) => {
            const options = {
                method: 'POST',
                headers: requestHeaders,
                body: `[{product_id: "${getCurrentProductID()}" , quantity: 1.00}]`
            }
            // TO DO: Add error handling here
            return makeRequest(`${API_END_POINT_URL}/baskets/${basketID}/items`, options)
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error('Unable to add item to cart')
                })
                .then((responseJSON) => {
                    return dispatch(receiveCartContents(parseBasketContents(responseJSON)))
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
    products: productDetailsCommands
}
