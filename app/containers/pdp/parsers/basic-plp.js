import Immutable from 'immutable'
import {parseTextLink} from '../../../utils/parser-utils'
import {initialState} from '../reducer'

export const basicPlpParser = ($, $html) => {
    const $products = $html.find('.item.product-item')
    const productMap = {}
    $products.each((_, product) => {
        const $product = $(product)
        const {href, text} = parseTextLink($product.find('.product-item-link'))
        productMap[href] = initialState.mergeDeep({
            product: Immutable.Map({
                title: text.trim(),
                price: $product.find('.price').text()
            }),
            contentsLoaded: false,
            isPlaceholder: false
        })
    })
    return productMap
}
