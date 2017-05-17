/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {receiveFormInfo} from '../actions'

import {fetchPageData} from '../app/commands'

import {receiveProductDetailsProductData, receiveProductDetailsUIData} from '../../products/results'
import {productDetailsParser, productDetailsUIParser, pdpAddToCartFormParser} from './parsers'

export const initProductDetailsPage = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then((res) => {
            const [$, $response] = res

            const pathKey = urlToPathKey(url)

            dispatch(receiveProductDetailsUIData({[pathKey]: productDetailsUIParser($, $response)}))
            dispatch(receiveProductDetailsProductData({[pathKey]: {
                ...productDetailsParser($, $response),
                href: url,
                variationCategories: [],
                variants: []
            }}))
            dispatch(receiveFormInfo({[pathKey]: pdpAddToCartFormParser($, $response)}))
        })
        .catch((error) => { console.info(error.message) })
}

export const getProductVariantData = () => (dispatch) => Promise.resolve()
