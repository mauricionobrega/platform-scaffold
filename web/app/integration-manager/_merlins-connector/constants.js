/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

// configuration is not currently used by the Merlin's connector
let config = {} // eslint-disable-line

export const registerConfig = (cfg) => {
    config = cfg
}

export const CHECKOUT_SHIPPING_URL = '/checkout/'
export const CART_URL = '/checkout/cart/'
export const PAYMENT_URL = '/checkout/payment/'
export const CREATE_ACCOUNT_POST_URL = '/customer/account/createpost/'
export const LOGIN_POST_URL = '/customer/account/loginPost/'
