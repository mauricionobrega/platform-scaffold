/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {receiveCategoryContents, receiveCategoryInformation} from '../../categories/results'
import {receiveProductListProductData} from '../../products/results'
import categoryProductsParser, {parseCategoryTitle, parseCategoryId, priceFilterParser} from './parser'
import {productListParser} from '../products/parsers'
import {fetchPageData} from '../app/commands'

export const initProductListPage = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then((res) => {
            const [$, $response] = res
            const pathKey = urlToPathKey(url)

            const title = parseCategoryTitle($, $response)
            const searchTermMatch = title.match(/'(.*)'/)

            // Receive page contents
            dispatch(receiveProductListProductData(productListParser($, $response)))
            dispatch(receiveCategoryInformation(pathKey, {
                id: parseCategoryId($, $response) || pathKey,
                href: pathKey,
                parentId: null,
                filters: priceFilterParser($, $response),
                title,
                searchTerm: searchTermMatch ? searchTermMatch[0] : null,
                custom: 'category custom content'
            }))
            dispatch(receiveCategoryContents(pathKey, categoryProductsParser($, $response)))
        })
}
