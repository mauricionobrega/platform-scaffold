import {parseTextLink, getTextFrom} from '../../../utils/parser-utils'
import {urlToPathKey} from '../../../utils/utils'

const sortParser = () => {
    return [
        {
            label: 'Name',
            value: 'name',
            active: true
        },
        {
            label: 'Price',
            value: 'price',
            active: false
        },
        {
            label: 'Position',
            value: 'position',
            active: false
        }
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
        sort: sortParser()
    }
}

export default productListParser
