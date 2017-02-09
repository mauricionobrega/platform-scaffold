import Immutable from 'immutable'

/**
 * Extract all of the JSON pieces in 'text/x-magento-init' script
 * elements, and merge them together into a single configuration object
 *
 * Returns an Immutable Map ready for the Redux store.
 */
export const extractMagentoJson = ($html) => {
    return $html
        .find('script[x-type="text/x-magento-init"]')
        .map((_, item) => item.innerHTML)
        .get()
        .map(JSON.parse)
        .map((item) => Immutable.fromJS(item))
        .reduce((summary, item) => summary.mergeDeep(item), Immutable.Map())
}

const SHIPPING_STEP_PATH = ['#checkout', 'Magento_Ui/js/core/app', 'components', 'checkout', 'children', 'steps', 'children', 'shipping-step', 'children', 'shippingAddress']

export const extractMagentoShippingStepData = ($html) => {
    return extractMagentoJson($html).getIn(SHIPPING_STEP_PATH)
}

export const getCheckoutConfigObject = ($html) => {
    const $configScript = $html.find('script:contains(window.checkoutConfig)')

    if ($configScript.length) {
        const objectMatch = /window\.checkoutConfig\s*=\s*([^;]+);/.exec($configScript.html())
        return objectMatch ? JSON.parse(objectMatch[1]) : {}
    }

    return {}
}
