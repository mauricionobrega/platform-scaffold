import {urlToPathKey} from '../../../utils/utils'
import {receiveCategory} from '../../categories/responses'
import {receiveProductListProductData} from '../../products/responses'
import categoryProductsParser from './parser'
import {productListParser} from '../products/parsers'
import {fetchPageData} from '../app/commands'

export const fetchProductListData = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then((res) => {
            const [$, $response] = res
            // Receive page contents
            dispatch(receiveProductListProductData(productListParser($, $response)))
            dispatch(receiveCategory({
                [urlToPathKey(url)]: categoryProductsParser($, $response)
            }))
        })
}
