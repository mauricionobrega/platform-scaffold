import {parseTextLink} from '../../../utils/parser-utils'
import {urlToPathKey} from '../../../utils/utils'

export const searchResultsParser = ($, $html) => {
    const products = $
          .makeArray($html.find('.item.product-item'))
          .map((product) => {
              return parseTextLink($(product).find('.product-item-link')).href
          })
          .map(urlToPathKey)
    return {
        products,
        searchTerm: 'searchTerm',
    }
}

export const searchFilterParser = () => {
    // comment
    return []
}
