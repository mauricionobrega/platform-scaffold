/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

// The wrapping is implemented here to avoid a circular dependency
// involving the containers and the app actions.
import Loadable from 'react-loadable'

import ContainerPlaceholder from '../components/container-placeholder'
import {requestIdleCallback} from '../utils/utils'

const loadableList = []
const PWALoadable = (loader) => {
    const loadable = Loadable({
        loader,
        LoadingComponent: ContainerPlaceholder
    })
    loadableList.push(loadable)
    return loadable
}

export const registerPreloadCallbacks = () => {
    loadableList.forEach((loadable) => {
        requestIdleCallback(() => loadable.preload())
    })
}

// These are on the old model and need to be wrapped here
// rather than in container.js to avoid circular imports
export const Cart = PWALoadable(() => import('./cart/container'))
export const CheckoutConfirmation = PWALoadable(() => import('./checkout-confirmation/container'))
export const CheckoutPayment = PWALoadable(() => import('./checkout-payment/container'))
export const CheckoutShipping = PWALoadable(() => import('./checkout-shipping/container'))
export const Login = PWALoadable(() => import('./login/container'))
export const ProductDetails = PWALoadable(() => import('./product-details/container'))
export const ProductList = PWALoadable(() => import('./product-list/container'))
