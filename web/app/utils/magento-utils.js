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
