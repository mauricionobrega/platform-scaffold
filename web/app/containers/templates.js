// The wrapping is implemented here to avoid a circular dependency
// involving the containers and the app actions.

import template from '../template'

import UnwrappedCart from './cart/container'
import UnwrappedCheckoutConfirmation from './checkout-confirmation/container'
import UnwrappedCheckoutPayment from './checkout-payment/container'
import UnwrappedCheckoutShipping from './checkout-shipping/container'
import UnwrappedHome from './home/container'
import UnwrappedLogin from './login/container'
import UnwrappedProductDetails from './product-details/container'
import UnwrappedProductList from './product-list/container'
import UnwrappedOffline from './offline/container'

export const Cart = template(UnwrappedCart)
export const CheckoutConfirmation = template(UnwrappedCheckoutConfirmation)
export const CheckoutPayment = template(UnwrappedCheckoutPayment)
export const CheckoutShipping = template(UnwrappedCheckoutShipping)
export const Home = template(UnwrappedHome)
export const Login = template(UnwrappedLogin)
export const ProductDetails = template(UnwrappedProductDetails)
export const ProductList = template(UnwrappedProductList)
export const Offline = template(UnwrappedOffline)
