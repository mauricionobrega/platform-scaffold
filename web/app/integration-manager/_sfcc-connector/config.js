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

export const getApiEndPoint = () => `/s/${getSiteID()}/dw/${API_TYPE}/${API_VERSION}`

export const getRequestHeaders = () => ({
    'Content-Type': 'application/json',
    'x-dw-client-id': config.clientID
})

export const getCategoryPath = (id) => `/s/${getSiteID()}/${id}`

const getBaseURL = () => `/on/demandware.store/${getSiteID()}/default/`

export const getHomeURL = () => `${getBaseURL()}Home-Show`
export const getSignInURL = () => `${getBaseURL()}Account-Show`
export const getSignOutURL = () => `${getBaseURL()}Logout-Logout`
export const getCheckoutShippingURL = () => `${getBaseURL()}COShipping-Start`
export const getCartURL = () => `${getBaseURL()}Cart-Show`
export const getPaymentURL = () => `${getBaseURL()}COBilling-Start`
export const getConfirmationURL = () => `${getBaseURL()}COSummary-Submit`
