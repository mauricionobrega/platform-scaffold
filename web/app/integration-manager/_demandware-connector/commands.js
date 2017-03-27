import {receiveCartContents} from '../../store/cart/actions'
import {parseBasketContents, getCurrentProductID} from './parsers'

import {API_END_POINT_URL} from './constants'
import {makeDemandwareRequest} from './utils'

import * as homeCommands from './home/commands'
import * as productsCommands from './products/commands'
import * as categoriesCommands from './categories/commands'
import * as cartCommands from './cart/commands'
import * as appCommands from './app/commands'
import * as checkoutCommands from './checkout/commands'

const addToCart = () => (dispatch) => {
    return cartCommands.getBasketID()
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
                .then((responseJSON) => dispatch(receiveCartContents(parseBasketContents(responseJSON))))
        })
}

export default {
    // These individual commands are temporary until we can refactor them into the
    // sub-areas they belong in.
    addToCart,

    home: homeCommands,
    products: productsCommands,
    categories: categoriesCommands,
    cart: cartCommands,
    app: appCommands,
    checkout: checkoutCommands
}
