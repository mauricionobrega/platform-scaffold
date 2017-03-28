// The wrapping is implemented here to avoid a circular dependency
// involving the containers and the app actions.

import React from 'react'
import Loadable from 'react-loadable'

import template from '../template'

// Try loading the checkout as a separate chunk entirely

// Don't split the PDP out from the main app, so that we can have instant page transitions


// import UnwrappedCart from './cart/container'
// import UnwrappedCheckoutConfirmation from './checkout-confirmation/container'
// import UnwrappedCheckoutPayment from './checkout-payment/container'
// import UnwrappedCheckoutShipping from './checkout-shipping/container'
// import UnwrappedHome from './home/container'
// import UnwrappedLogin from './login/container'
// import UnwrappedProductDetails from './product-details/container'
// import UnwrappedProductList from './product-list/container'
import UnwrappedOffline from './offline/container'

const LoadingComponent = () => false

export const UnwrappedCart = Loadable({
    loader: () => import('./cart/container'),
    LoadingComponent
})

export const UnwrappedHome = Loadable({
    loader: () => import('./home/container'),
    LoadingComponent
})

export const UnwrappedCheckoutConfirmation = Loadable({
    loader: () => import('./checkout-confirmation/container'),
    LoadingComponent
})

export const UnwrappedCheckoutPayment = Loadable({
    loader: () => import('./checkout-payment/container'),
    LoadingComponent
})

export const UnwrappedCheckoutShipping = Loadable({
    loader: () => import('./checkout-shipping/container'),
    LoadingComponent
})

export const UnwrappedLogin = Loadable({
    loader: () => import('./login/container'),
    LoadingComponent
})

export const UnwrappedProductDetails = Loadable({
    loader: () => import('./product-details/container'),
    LoadingComponent
})

export const UnwrappedProductList = Loadable({
    loader: () => import('./product-list/container'),
    LoadingComponent
})

export const Cart = template(UnwrappedCart)
export const CheckoutConfirmation = template(UnwrappedCheckoutConfirmation)
export const CheckoutPayment = template(UnwrappedCheckoutPayment)
export const CheckoutShipping = template(UnwrappedCheckoutShipping)
export const Home = template(UnwrappedHome)
export const Login = template(UnwrappedLogin)
export const ProductDetails = template(UnwrappedProductDetails)
export const ProductList = template(UnwrappedProductList)
export const Offline = template(UnwrappedOffline)
