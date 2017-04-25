import {parseTextLink, getTextFrom, parseSelect} from '../../../utils/parser-utils'
import {urlToPathKey} from '../../../utils/utils'

const REGEX_NON_NUM = /\D/g
const REGEX_NON_ALPHA_NUM = /\W/g
const REGEX_DASH = /-/g

const priceParser = (value) => {
    const values = value.split('-')
    const floor = parseInt(values[0]) || 0
    let ceiling = parseInt(values[1]) || Infinity

    // Sometimes you get values like `0-10` and `10-20`. The ceiling of one
    // price should not overlap with the floor of another.
    ceiling = ceiling - 0.01
    // We're choosing to subtract from the ceiling because a value of `0-10` is
    // otherwise labelled `$0 - $9.99` elsewhere. This aligns the values to match.

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
            const count = $count.text().replace(REGEX_NON_NUM, '')

            query = query.replace(REGEX_DASH, 'to').replace(REGEX_NON_ALPHA_NUM, '')

            return {
                count, // 2
                criteria: priceParser(price), // priceParser('10-20')
                label: $kind.text().trim(), // '$10.00 - $19.99'
                ruleset: 'price', // we only have one ruleset at the moment
                query // 'price10to20'
            }
        }).toArray()
    }]
}

const productListParser = ($, $html) => {
    const $numItems = $html.find('#toolbar-amount .toolbar-number').first()
    const $sortSelect = $html.find('.sorter-options').first()

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
        filters: priceFilterParser($, $html),
        sort: parseSelect($, $sortSelect)
    }
}

export default productListParser
