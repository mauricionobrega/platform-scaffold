// The wrapping is implemented here to avoid a circular dependency
// involving the containers and the app actions.
import Loadable from 'react-loadable'

import template from '../template'

// Don't split the Home container out from the main app, so that we can have instant page transitions
import Home from './home/container'
import Offline from './offline/container'
import ContainerPlaceholder from '../components/container-placeholder'

// export const UnwrappedCart = Loadable({
//     loader: () => import('./cart/container'),
//     LoadingComponent: ContainerPlaceholder
// })

// export const UnwrappedCheckoutConfirmation = Loadable({
//     loader: () => import('./checkout-confirmation/container'),
//     LoadingComponent: ContainerPlaceholder
// })

// export const UnwrappedCheckoutPayment = Loadable({
//     loader: () => import('./checkout-payment/container'),
//     LoadingComponent: ContainerPlaceholder
// })

// export const UnwrappedCheckoutShipping = Loadable({
//     loader: () => import('./checkout-shipping/container'),
//     LoadingComponent: ContainerPlaceholder
// })

// export const UnwrappedLogin = Loadable({
//     loader: () => import('./login/container'),
//     LoadingComponent: ContainerPlaceholder
// })

export const ProductDetails = Loadable({
    loader: () => import('./product-details/container'),
    LoadingComponent: ContainerPlaceholder
})

export const ProductList = Loadable({
    loader: () => import('./product-list/container'),
    LoadingComponent: ContainerPlaceholder
})

import UnwrappedCart from './cart/container'
import UnwrappedCheckoutConfirmation from './checkout-confirmation/container'
import UnwrappedCheckoutPayment from './checkout-payment/container'
import UnwrappedCheckoutShipping from './checkout-shipping/container'
import UnwrappedLogin from './login/container'

export const Cart = template(UnwrappedCart)
export const CheckoutConfirmation = template(UnwrappedCheckoutConfirmation)
export const CheckoutPayment = template(UnwrappedCheckoutPayment)
export const CheckoutShipping = template(UnwrappedCheckoutShipping)
export const Login = template(UnwrappedLogin)

export {Home, Offline}
