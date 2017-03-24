import {register as registerHome} from './home/commands'
import {register as registerProducts} from './products/commands'
import {register as registerCategories} from './categories/commands'
import {register as registerCart} from './cart/commands'
import {register as registerApp} from './app/commands'
import {register as registerCheckout} from './checkout/commands'

let connector = {}

export const register = (commands) => {
    connector = commands
    registerApp(commands.app)
    registerHome(commands.home)
    registerProducts(commands.products)
    registerCategories(commands.categories)
    registerCart(commands.cart)
    registerCheckout(commands.checkout)
}

export const addToCart = (...args) => connector.addToCart(...args)

export const submitNewsletter = (...args) => connector.submitNewsletter(...args)
