import {makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'


import * as homeCommands from './home/commands'
import * as productsCommands from './products/commands'
import * as categoriesCommands from './categories/commands'
import * as cartCommands from './cart/commands'
import * as appCommands from './app/commands'
import * as checkoutCommands from './checkout/commands'


export const addToCart = (key, qty) => (dispatch, getStore) => {
    const formInfo = getStore().integrationManager.get(key)
    const formValues = {
        ...formInfo.get('hiddenInputs').toJS(),
        qty
    }
    return makeFormEncodedRequest(formInfo.get('submitUrl'), formValues, {method: formInfo.get('method')})
        .then(() => {
            return dispatch(cartCommands.getCart())
        })
}

export const submitNewsletter = (formData) => {
    return makeFormEncodedRequest('/newsletter/subscriber/new/', formData, {method: 'POST'})
}

export default {
    // These individual commands are temporary until we can refactor them into the
    // sub-areas they belong in.
    addToCart,

    checkout: checkoutCommands,
    home: homeCommands,
    products: productsCommands,
    categories: categoriesCommands,
    cart: cartCommands,
    app: appCommands
}
