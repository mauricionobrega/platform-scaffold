import {parseTextLink} from '../../../utils/parser-utils'

const plpParser = ($, $html) => {
    const $numItems = $html.find('#toolbar-amount .toolbar-number').first()

    const $products = $html.find('.item.product-item')
    const products = $.makeArray($products).map((product) => {
        return parseTextLink($(product).find('.product-item-link')).href
    }).map((href) => new URL(href).pathname)

    return {
        noResultsText: $html.find('.message.empty').text(),
        itemCount: $numItems.length > 0 ? $numItems.text() : '0',
        products,
        title: $html.find('.page-title').text().trim(), // eslint-disable-line newline-per-chained-call
    }
}

export default plpParser
