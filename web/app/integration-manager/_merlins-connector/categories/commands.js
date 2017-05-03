import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {receiveCategoryContents, receiveCategoryInformation} from '../../categories/results'
import {receiveProductListProductData} from '../../products/results'
import categoryProductsParser, {parseCategoryTitle, parseCategoryId, priceFilterParser} from './parser'
import {productListParser} from '../products/parsers'
import {fetchPageData} from '../app/commands'

export const fetchProductListData = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then((res) => {
            const [$, $response] = res
            const pathKey = urlToPathKey(url)
            // Receive page contents
            dispatch(receiveProductListProductData(productListParser($, $response)))
            dispatch(receiveCategoryInformation(pathKey, {
                id: parseCategoryId($, $response) || pathKey,
                href: pathKey,
                parentId: null,
                filters: priceFilterParser($, $response),
                title: parseCategoryTitle($, $response),
            }))
            dispatch(receiveCategoryContents(pathKey, categoryProductsParser($, $response)))
        })
}
