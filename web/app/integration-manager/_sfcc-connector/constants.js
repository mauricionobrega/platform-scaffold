/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

const API_TYPE = 'shop'
const API_VERSION = 'v17_2'
export const SITE_ID = 'Sites-2017refresh-Site'
export const DW_CLIENT_ID = '5640cc6b-f5e9-466e-9134-9853e9f9db93'
export const API_END_POINT_URL = `/s/${SITE_ID}/dw/${API_TYPE}/${API_VERSION}`
export const REQUEST_HEADERS = {
    'Content-Type': 'application/json',
    'x-dw-client-id': DW_CLIENT_ID
}
export const SIGN_IN_URL = `/on/demandware.store/${SITE_ID}/default/Account-Show`
export const CHECKOUT_SHIPPING_URL = `/on/demandware.store/${SITE_ID}/default/COShipping-Start`
export const CART_URL = `/on/demandware.store/${SITE_ID}/default/Cart-Show`
