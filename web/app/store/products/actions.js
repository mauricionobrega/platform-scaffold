import {createAction, urlToPathKey} from '../../utils/utils'

import {productListParser, productDetailsParser, searchResultParser} from './parser'

export const receiveProductListProductData = createAction('Receive ProductList product data')
export const receiveProductDetailsProductData = createAction('Receive ProductDetails product data')
export const receiveSearchResultProductData = createAction('Receive SearchResult product data')

export const processProductList = ({payload: {$, $response}}) =>
    receiveProductListProductData(productListParser($, $response))
export const processProductDetails = ({payload: {$, $response, url}}) =>
    receiveProductDetailsProductData({[urlToPathKey(url)]: productDetailsParser($, $response)})
export const processSearchResult = ({payload: {$, $response}}) =>
    receiveSearchResultProductData(searchResultParser($, $response))
