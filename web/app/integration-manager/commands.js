import {register as registerHome} from './home/commands'
import {register as registerProducts} from './products/commands'
import {register as registerCategories} from './categories/commands'

let connector = {}

export const register = (commands) => {
    connector = commands

    registerHome(commands.home)
    registerProducts(commands.products)
    registerCategories(commands.categories)
}

export const addToCart = (...args) => connector.addToCart(...args)

export const fetchCheckoutShippingData = (...args) => connector.fetchCheckoutShippingData(...args)

export const submitShipping = (...args) => connector.submitShipping(...args)

export const checkCustomerEmail = (...args) => connector.checkCustomerEmail(...args)

export const submitSignIn = (...args) => connector.submitSignIn(...args)

export const getProductVariationData = (...args) => connector.getProductVariationData(...args)

export const submitNewsletter = (...args) => connector.submitNewsletter(...args)
