// The wrapping is implemented here to avoid a circular dependency
// involving the containers and the app actions.
import React from 'react'
import Loadable from 'react-loadable'

import template from '../template'

// Don't split the Home container out from the main app, so that we can have instant page transitions
import UnwrappedHome from './home/container'
import UnwrappedOffline from './offline/container'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

const LoadingPlaceholder = () => <SkeletonBlock height="100vh" width="100%" />

export const UnwrappedCart = Loadable({
    loader: () => import('./cart/container'),
    LoadingPlaceholder
})

export const UnwrappedCheckoutConfirmation = Loadable({
    loader: () => import('./checkout-confirmation/container'),
    LoadingPlaceholder
})

export const UnwrappedCheckoutPayment = Loadable({
    loader: () => import('./checkout-payment/container'),
    LoadingPlaceholder
})

export const UnwrappedCheckoutShipping = Loadable({
    loader: () => import('./checkout-shipping/container'),
    LoadingPlaceholder
})

export const UnwrappedLogin = Loadable({
    loader: () => import('./login/container'),
    LoadingPlaceholder
})

export const UnwrappedProductDetails = Loadable({
    loader: () => import('./product-details/container'),
    LoadingPlaceholder
})

export const UnwrappedProductList = Loadable({
    loader: () => import('./product-list/container'),
    LoadingPlaceholder
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
