import {createAction, urlToPathKey} from '../../utils/utils'

import {productListParser, productDetailsParser} from './parser'

export const receivePlpProductData = createAction('Receive ProductList product data')
export const receivePdpProductData = createAction('Receive ProductDetails product data')

export const processPlp = ({payload: {$, $response}}) =>
    receivePlpProductData(productListParser($, $response))
export const processPdp = ({payload: {$, $response, url}}) =>
    receivePdpProductData({[urlToPathKey(url)]: productDetailsParser($, $response)})
