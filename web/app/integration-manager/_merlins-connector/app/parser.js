/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {getCheckoutConfigObject} from '../../../utils/magento-utils'

export const parseLoginStatus = ($html) => {
    if ($html.find('.customer-welcome').length > 0) {
        return true
    }
    // We may be on a checkout page so check the checkout config object
    const config = getCheckoutConfigObject($html)
    return (config && config.customerData) ? config.customerData.constructor !== Array : false
}
