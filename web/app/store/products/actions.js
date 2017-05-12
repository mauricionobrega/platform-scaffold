/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction, urlToPathKey} from '../../utils/utils'

import {productListParser, productDetailsParser} from './parser'

export const receiveProductListProductData = createAction('Receive ProductList product data')
export const receiveProductDetailsProductData = createAction('Receive ProductDetails product data')

export const processProductList = ({payload: {$, $response}}) =>
    receiveProductListProductData(productListParser($, $response))
export const processProductDetails = ({payload: {$, $response, url}}) =>
    receiveProductDetailsProductData({[urlToPathKey(url)]: productDetailsParser($, $response)})
