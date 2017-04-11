// The wrapping is implemented here to avoid a circular dependency
// involving the containers and the app actions.
import Loadable from 'react-loadable'

import template from '../template'

import ContainerPlaceholder from '../components/container-placeholder'

export const Cart = Loadable({
    loader: () => import('./cart/container'),
    LoadingComponent: ContainerPlaceholder
})

// These are on the old model and need to be wrapped here
// rather than in container.js
export const CheckoutConfirmation = Loadable({
    loader: () => import('./checkout-confirmation/container')
        .then((component) => template(component)),
    LoadingComponent: ContainerPlaceholder
})

export const CheckoutPayment = Loadable({
    loader: () => import('./checkout-payment/container')
        .then((component) => template(component)),
    LoadingComponent: ContainerPlaceholder
})

export const CheckoutShipping = Loadable({
    loader: () => import('./checkout-shipping/container'),
    LoadingComponent: ContainerPlaceholder
})

export const Login = Loadable({
    loader: () => import('./login/container'),
    LoadingComponent: ContainerPlaceholder
})

export const ProductDetails = Loadable({
    loader: () => import('./product-details/container'),
    LoadingComponent: ContainerPlaceholder
})

export const ProductList = Loadable({
    loader: () => import('./product-list/container'),
    LoadingComponent: ContainerPlaceholder
})
