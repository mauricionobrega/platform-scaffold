import {parseTextLink, getTextFrom} from '../../../utils/parser-utils'
import {urlToPathKey} from '../../../utils/utils'

const tokenizePrice = (value) => {
    const values = value.split('-')
    const floor = values[0] || 0
    const ceiling = values[1] || Infinity
    return {floor, ceiling}
}

const parseFilters = () => {
    return [
        {
            id: 'price',
            label: 'Price',
            kinds: [
                {
                    value: tokenizePrice('-10'),
                    label: '$0.00 - $9.99',
                    count: '1',
                    // active: true
                }, {
                    value: tokenizePrice('10-20'),
                    label: '$10.00 - $19.99',
                    count: '2',
                    // active: true
                }, {
                    value: tokenizePrice('20-30'),
                    label: '$20.00 - $29.99',
                    count: '2',
                    active: true
                },
            ]
        },
        {
            id: 'color',
            label: 'Color',
            kinds: [
                {
                    value: 'grey',
                    label: 'Gray',
                    count: '1'
                }, {
                    value: 'blue',
                    label: 'Blue',
                    count: '1',
                    active: true
                },
            ]
        },
    ]
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
        filters: parseFilters()
    }
}

export default productListParser
