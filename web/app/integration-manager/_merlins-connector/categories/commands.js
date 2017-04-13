import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {receiveCategory} from '../../categories/responses'
import {receiveProductListProductData} from '../../products/responses'
import categoryProductsParser from './parser'
import {productListParser} from '../products/parsers'
import {fetchPageData} from '../app/commands'

export const fetchProductListData = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then((res) => {
            const [$, $response] = res
            const pathKey = urlToPathKey(url)
            // Receive page contents
            dispatch(receiveProductListProductData(productListParser($, $response)))
            dispatch(receiveCategory({
                [pathKey]: {
                    ...categoryProductsParser($, $response),
                    // I can't really find a categoryId in the Merlin's HTML
                    id: pathKey,
                    href: pathKey,
                    parentId: null
                }
            }))
        })
}
