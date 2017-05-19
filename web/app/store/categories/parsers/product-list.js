import {parseTextLink, getTextFrom} from '../../../utils/parser-utils'
import {urlToPathKey} from '../../../utils/utils'

const productListParser = ($, $html) => {
    const $numItems = $html.find('#toolbar-amount .toolbar-number').first()

    const products = $
          .makeArray($html.find('.item.product-item'))
          .map((product) => {
              return parseTextLink($(product).find('.product-item-link')).href
          })
          .map(urlToPathKey)

    // TEMPORARY change to remove a product on Merlin's which no longer works with the
    // current branch. This particular product supports variants, which isn't supported
    // by the current release, but will be once the Integration Manager changes ship.
    if (/potions.html/.test(window.location.href)) {
        products.shift()
    }

    return {
        noResultsText: getTextFrom($html, '.message.empty'),
        itemCount: $numItems.length > 0 ? $numItems.text() : '0',
        products,
        title: getTextFrom($html, '.page-title')
    }
}

export default productListParser
