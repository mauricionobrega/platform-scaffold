import {extractMagentoJson} from '../../utils/magento-utils'


const SHIPPING_STEP_PATH = ['#checkout', 'Magento_Ui/js/core/app', 'components', 'checkout', 'children', 'steps', 'children', 'shipping-step', 'children', 'shippingAddress']

const checkoutShippingParser = ($, $html) => {
    const shippingStepData = extractMagentoJson($html).getIn(SHIPPING_STEP_PATH)

    return {
        formTitle: shippingStepData.getIn(['config', 'popUpForm', 'options', 'title']),
    }
}

export default checkoutShippingParser
