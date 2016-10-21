import {parseImage, parseTextLink} from '../../../utils/parser-utils'

const plpParser = ($, $html) => {
    const $numItems = $html.find('#toolbar-amount .toolbar-number').first()

    const $products = $html.find('.item.product-item')
    const products = $.makeArray($products).map((product) => {
        const $product = $(product)
        const image = parseImage($product.find('.product-image-photo'))
        const link = parseTextLink($product.find('.product-item-link'))

        return {
            link,
            image,
            price: $product.find('.price').text()
        }
    })

    return {
        hasProducts: products.length > 0,
        isPlaceholder: false,
        noResultsText: $html.find('.message.empty').text(),
        numItems: $numItems.length > 0 ? $numItems.text() : '0',
        products,
        title: $html.find('.page-title').text().trim(), // eslint-disable-line newline-per-chained-call
    }
}

export default plpParser
