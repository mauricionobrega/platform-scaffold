/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {config} from './index'

const API_TYPE = 'shop'
const API_VERSION = 'v17_4'

// Overall SFCC URL documentation
// https://documentation.demandware.com/DOC2/index.jsp?topic=%2Fcom.demandware.dochelp%2FOCAPI%2F17.4%2Fusage%2FUrlSchema.html&cp=0_11_2_25

export const SITE_ID = `Sites-${config.siteID}-Site`
export const API_END_POINT_URL = `/s/${SITE_ID}/dw/${API_TYPE}/${API_VERSION}`
export const REQUEST_HEADERS = {
    'Content-Type': 'application/json',
    'x-dw-client-id': config.clientID
}

const BASE_PAGE_URL = `/on/demandware.store/${SITE_ID}/default/`

export const HOME_URL = `${BASE_PAGE_URL}/Home-Show`
export const SIGN_IN_URL = `${BASE_PAGE_URL}/Account-Show`
export const SIGN_OUT_URL = `${BASE_PAGE_URL}/Logout-Logout`
export const CHECKOUT_SHIPPING_URL = `${BASE_PAGE_URL}/COShipping-Start`
export const CART_URL = `${BASE_PAGE_URL}/Cart-Show`
export const PAYMENT_URL = `${BASE_PAGE_URL}/COBilling-Start`
