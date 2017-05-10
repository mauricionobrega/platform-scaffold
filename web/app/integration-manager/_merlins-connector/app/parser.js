import {getCheckoutConfigObject} from '../../../utils/magento-utils'

export const appParser = ($html) => {
    let isLoggedIn = !!$html.find('.customer-welcome').length
    if (!isLoggedIn) {
        // We may be on a checkout page so check the checkout config object
        const config = getCheckoutConfigObject($html)
        isLoggedIn = (config && config.customerData) ? config.customerData.constructor !== Array : isLoggedIn
    }
    return {isLoggedIn}
}
