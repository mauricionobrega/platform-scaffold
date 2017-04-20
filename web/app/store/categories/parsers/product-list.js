import {parseTextLink, getTextFrom} from '../../../utils/parser-utils'
import {urlToPathKey} from '../../../utils/utils'

const REGEX_NON_ALPHA_NUM = /\W/g
const REGEX_DASH = /-/g

const priceParser = (value) => {
    const values = value.split('-')
    const floor = parseInt(values[0]) || 0
    const ceiling = parseInt(values[1]) || Infinity
    return {floor, ceiling}
}

const priceFilterParser = ($, $html) => {
    const $priceOptions = $html.find('.filter-options .item')

    return [{
        label: 'Price',
        ruleset: 'price',
        kinds: $priceOptions.map((idx, kind) => {
            const $kind = $(kind)
            let query = $kind.find('a')[0].search
            const price = query.split('=')[1]
            const $count = $kind.find('.count').remove()

            query = query.replace(REGEX_DASH, 'to').replace(REGEX_NON_ALPHA_NUM, '')

            return {
                // active: $kind.find(''), // false
                count: $count.text(), // 2
                criteria: priceParser(price), // priceParser('10-20')
                label: $kind.text(), // '$10.00 - $19.99'
                query // 'price10to20'
            }
        }).toArray()
    }]
}

const productListParser = ($, $html) => {
    const $numItems = $html.find('#toolbar-amount .toolbar-number').first()

    const products = $
          .makeArray($html.find('.item.product-item'))
          .map((product) => {
              return parseTextLink($(product).find('.product-item-link')).href
          })
          .map(urlToPathKey)

    return {
        noResultsText: getTextFrom($html, '.message.empty'),
        itemCount: $numItems.length > 0 ? $numItems.text() : '0',
        products,
        title: getTextFrom($html, '.page-title'),
        filters: priceFilterParser($, $html)
    }
}

export default productListParser
