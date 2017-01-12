import {parseTextLink} from '../../../utils/parser-utils'

const plpParser = ($, $html) => {
    const $numItems = $html.find('#toolbar-amount .toolbar-number').first()

    const $products = $html.find('.item.product-item')
    const productUrls = $.makeArray($products).map((product) => {
        return parseTextLink($(product).find('.product-item-link')).href
    })

    return {
        hasProducts: productUrls.length > 0,
        contentsLoaded: true,
        noResultsText: $html.find('.message.empty').text(),
        numItems: $numItems.length > 0 ? $numItems.text() : '0',
        productUrls,
        title: $html.find('.page-title').text().trim(), // eslint-disable-line newline-per-chained-call
    }
}

export default plpParser
