import {register as registerHome} from './home/commands'
import {register as registerProductDetails} from './product-details/commands'

let connector = {}

export const register = (commands) => {
    connector = commands
    registerHome(commands.home)
    registerProductDetails(commands.productDetails)
}

export const addToCart = (...args) => connector.addToCart(...args)

export const fetchCheckoutShippingData = (...args) => connector.fetchCheckoutShippingData(...args)

export const submitShipping = (...args) => connector.submitShipping(...args)

export const checkCustomerEmail = (...args) => connector.checkCustomerEmail(...args)

export const submitSignIn = (...args) => connector.submitSignIn(...args)
