import {parseTextLink, getTextFrom} from '../../../utils/parser-utils'
import {urlToPathKey} from '../../../utils/utils'

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
            const price = $kind.find('a')[0].search.split('=')[1]
            const $count = $kind.find('.count').remove()

            return {
                // active: $kind.find(''), // false
                count: $count.text(), // 2
                criteria: priceParser(price), // priceParser('10-20')
                label: $kind.text(), // '$10.00 - $19.99'
            }
        }).toArray()
    }]

    // return [
    //     {
    //         label: 'Price',
    //         ruleset: 'price',
    //         kinds: [
    //             {
    //                 active: true,
    //                 count: '1',
    //                 criteria: priceParser('-10'),
    //                 label: '$0.00 - $9.99'
    //             }, {
    //                 // active: true,
    //                 count: '2',
    //                 criteria: priceParser('10-20'),
    //                 label: '$10.00 - $19.99'
    //             }, {
    //                 // active: true,
    //                 count: '2',
    //                 criteria: priceParser('20-30'),
    //                 label: '$20.00 - $29.99'
    //             },
    //         ]
    //     }
    // ]
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
