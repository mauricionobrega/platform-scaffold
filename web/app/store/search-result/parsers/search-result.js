import {parseTextLink, getTextFrom, parseSelect} from '../../../utils/parser-utils'
import {urlToPathKey} from '../../../utils/utils'

export const searchResultsParser = ($, $html) => {
    const term = getTextFrom($html, '.page-title')
    const searchTerm = term.slice(term.indexOf('\'') + 1, term.length - 1)
    const $sortSelect = $html.find('.sorter-options').first()

    const products = $
          .makeArray($html.find('.item.product-item'))
          .map((product) => {
              return parseTextLink($(product).find('.product-item-link')).href
          })
          .map(urlToPathKey)
    return {
        products,
        searchTerm,
        sort: parseSelect($, $sortSelect)
    }
}
