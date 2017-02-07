import {extractMagentoJson} from '../../../utils/magento-utils'

const getCheckoutConfigObject = ($html) => {
    const $configScript = $html.find('script:contains(window.checkoutConfig)')

    if ($configScript.length) {
        const objectMatch = /window\.checkoutConfig\s*=\s*([^;]+);/.exec($configScript.html())
        return objectMatch ? JSON.parse(objectMatch[1]) : {}
    }

    return {}
}

const SHIPPING_STEP_PATH = ['#checkout', 'Magento_Ui/js/core/app', 'components', 'checkout', 'children', 'steps', 'children', 'shipping-step', 'children', 'shippingAddress']

const checkoutShippingParser = ($, $html) => {
    const shippingStepData = extractMagentoJson($html).getIn(SHIPPING_STEP_PATH)
    const configObject = getCheckoutConfigObject($html)

    return {
        formTitle: shippingStepData.getIn(['config', 'popUpForm', 'options', 'title']),
        // entity_id is used for calls to the ID
        customerEntityID: configObject ? configObject.quoteData.entity_id : ''
    }
}

export default checkoutShippingParser
