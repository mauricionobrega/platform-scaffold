// The wrapping is implemented here to avoid a circular dependency
// involving the containers and the app actions.

import template from '../template'
import RawCart from './cart/container'
import RawCheckoutConfirmation from './checkout-confirmation/container'
import RawCheckoutPayment from './checkout-payment/container'
import RawCheckoutShipping from './checkout-shipping/container'
import RawHome from './home/container'
import RawLogin from './login/container'
import RawProductDetails from './product-details/container'
import RawProductList from './product-list/container'
import RawOffline from './offline/container'

export const Cart = template(RawCart)
export const CheckoutConfirmation = template(RawCheckoutConfirmation)
export const CheckoutPayment = template(RawCheckoutPayment)
export const CheckoutShipping = template(RawCheckoutShipping)
export const Home = template(RawHome)
export const Login = template(RawLogin)
export const ProductDetails = template(RawProductDetails)
export const ProductList = template(RawProductList)
export const Offline = template(RawOffline)
