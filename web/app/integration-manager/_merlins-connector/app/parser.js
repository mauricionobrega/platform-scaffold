import {getCheckoutConfigObject} from '../../../utils/magento-utils'

export const parseLoginStatus = ($html) => {
    const welcomePresent = !!$html.find('.customer-welcome').length
    if (welcomePresent) {
        return true
    }
    // We may be on a checkout page so check the checkout config object
    const config = getCheckoutConfigObject($html)
    return (config && config.customerData) ? config.customerData.constructor !== Array : false
}
