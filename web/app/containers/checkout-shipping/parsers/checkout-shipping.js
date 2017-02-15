import {extractMagentoShippingStepData} from '../../../utils/magento-utils'




const checkoutShippingParser = ($, $html) => {
    const shippingStepData = extractMagentoShippingStepData($html)

    return {
        formTitle: shippingStepData.getIn(['config', 'popUpForm', 'options', 'title'])
    }
}

export default checkoutShippingParser
