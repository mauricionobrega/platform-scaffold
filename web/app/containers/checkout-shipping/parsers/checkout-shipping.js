import {extractMagentoShippingStepData, getCheckoutConfigObject} from '../../../utils/magento-utils'




const checkoutShippingParser = ($, $html) => {
    const shippingStepData = extractMagentoShippingStepData($html)
    const configObject = getCheckoutConfigObject($html)

    return {
        formTitle: shippingStepData.getIn(['config', 'popUpForm', 'options', 'title']),
        // entity_id is used for calls to the ID
        customerEntityID: configObject ? configObject.quoteData.entity_id : ''
    }
}

export default checkoutShippingParser
