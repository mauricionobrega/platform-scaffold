// The wrapping is implemented here to avoid a circular dependency
// involving the containers and the app actions.

import template from '../template'
import UnwrappedCart from './cart/container'
import UnwrappedCheckoutConfirmation from './checkout-confirmation/container'
import UnwrappedCheckoutPayment from './checkout-payment/container'
import UnwrappedCheckoutShipping from './checkout-shipping/container'
import UnwrappedHome from './home/container'
import UnwrappedLogin from './login/container'
import UnwrappedPDP from './pdp/container'
import UnwrappedPLP from './plp/container'

export const Cart = template(UnwrappedCart)
export const CheckoutConfirmation = template(UnwrappedCheckoutConfirmation)
export const CheckoutPayment = template(UnwrappedCheckoutPayment)
export const CheckoutShipping = template(UnwrappedCheckoutShipping)
export const Home = template(UnwrappedHome)
export const Login = template(UnwrappedLogin)
export const PDP = template(UnwrappedPDP)
export const PLP = template(UnwrappedPLP)
