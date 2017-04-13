import {getTextFrom} from '../../../utils/parser-utils'
import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'

/* eslint-disable newline-per-chained-call */

const categoryProductsParser = ($, $html) => {
    const $numItems = $html.find('#toolbar-amount .toolbar-number').first()

    const products = $
          .makeArray($html.find('.item.product-item'))
          .map((product) => $(product).find('.product-item-link').attr('href'))
          .map(urlToPathKey)

    return {
        itemCount: $numItems.length > 0 ? parseInt($numItems.text(), 10) : 0,
        products,
        title: getTextFrom($html, '.page-title')
    }
}

export default categoryProductsParser
