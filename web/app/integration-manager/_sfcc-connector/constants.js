/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

const API_TYPE = 'shop'
const API_VERSION = 'v17_4'

let config = {}

export const registerConfig = (cfg) => {
    config = cfg
}

export const getSiteID = () => config.siteID

export const getApiEndPoint = () => `/s/${config.siteID}/dw/${API_TYPE}/${API_VERSION}`

export const getRequestHeaders = () => ({
    'Content-Type': 'application/json',
    'x-dw-client-id': config.clientID
})

export const getHomeURL = () => `/on/demandware.store/${config.siteID}/default/Home-Show`
export const getSignInURL = () => `/on/demandware.store/${config.siteID}/default/Account-Show`
export const getSignOutURL = () => `/on/demandware.store/${config.siteID}/default/Logout-Logout`
export const getCheckoutShippingURL = () => `/on/demandware.store/${config.siteID}/default/COShipping-Start`
export const getCartURL = () => `/on/demandware.store/${config.siteID}/default/Cart-Show`
export const getPaymentURL = () => `/on/demandware.store/${config.siteID}/default/COBilling-Start`
