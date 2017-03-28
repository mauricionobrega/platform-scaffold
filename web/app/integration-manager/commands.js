import {register as registerHome} from './home/commands'
import {register as registerProducts} from './products/commands'
import {register as registerCategories} from './categories/commands'
import {register as registerCart} from './cart/commands'
import {register as registerApp} from './app/commands'
import {register as registerLogin} from './login/commands'

let connector = {}

export const register = (commands) => {
    connector = commands
    registerApp(commands.app)
    registerHome(commands.home)
    registerProducts(commands.products)
    registerCategories(commands.categories)
    registerCart(commands.cart)
    registerLogin(commands.login)
}

export const addToCart = (...args) => connector.addToCart(...args)

export const fetchCheckoutShippingData = (...args) => connector.fetchCheckoutShippingData(...args)

export const submitShipping = (...args) => connector.submitShipping(...args)

export const checkCustomerEmail = (...args) => connector.checkCustomerEmail(...args)

export const submitSignIn = (...args) => connector.submitSignIn(...args)

export const submitNewsletter = (...args) => connector.submitNewsletter(...args)
