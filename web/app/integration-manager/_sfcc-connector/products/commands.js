/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {browserHistory} from 'progressive-web-sdk/dist/routing'
import {receiveProductDetailsProductData, receiveProductDetailsUIData} from '../../products/results'
import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {makeSfccRequest} from '../utils'
import {parseProductDetails, getCurrentProductID, getProductHref} from '../parsers'
import {API_END_POINT_URL} from '../constants'

export const fetchPdpData = () => (dispatch) => {
    const productURL = `${API_END_POINT_URL}/products/${getCurrentProductID()}?expand=prices,images,variations`
    const productPathKey = urlToPathKey(window.location.href)
    const options = {
        method: 'GET'
    }
    return makeSfccRequest(productURL, options)
        .then((response) => response.json())
        .then((responseJSON) => {
            const productDetailsData = {
                ...parseProductDetails(responseJSON),
                href: productPathKey
            }
            const productDetailsMap = {
                [productPathKey]: productDetailsData
            }
            productDetailsData.variants.forEach(({id}) => {
                productDetailsMap[getProductHref(id)] = productDetailsData
            })
            dispatch(receiveProductDetailsProductData(productDetailsMap))
            dispatch(receiveProductDetailsUIData({[productPathKey]: {itemQuantity: responseJSON.step_quantity}}))
        })
}

export const getProductVariantData = (selections, variants, categoryIds) => (dispatch) => {
    if (categoryIds.some((id) => !selections[id])) {
        return
    }

    for (const {values, id} of variants) {
        if (categoryIds.every((id) => selections[id] === values[id])) {
            setTimeout(() => {
                browserHistory.push({
                    pathname: getProductHref(id)
                })
            }, 250)
            return
        }
    }
}
