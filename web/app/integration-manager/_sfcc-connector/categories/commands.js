/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {makeApiRequest} from '../utils'
import {receiveCategoryContents, receiveCategoryInformation} from '../../categories/results'
import {receiveProductListProductData} from '../../products/results'
import {parseProductListData} from '../parsers'

import {getSiteID} from '../config'

const makeCategoryURL = (id) => `/categories/${id}`
const makeCategorySearchURL = (id) => `/product_search?expand=images,prices&q=&refine_1=cgid=${id}`

/* eslint-disable camelcase, no-use-before-define */
const processCategory = (dispatch) => ({parent_category_id, id, name}) => {
    const parentId = parent_category_id !== 'root' ? parent_category_id : null
    const path = `/s/${getSiteID()}/${id}`
    dispatch(receiveCategoryInformation(path, {
        id,
        title: name,
        href: path,
        parentId
    }))

    if (parentId) {
        dispatch(fetchCategoryInfo(parentId))
    }
}
/* eslint-enable camelcase, no-use-before-define */

const fetchCategoryInfo = (id) => (dispatch) => {
    return makeApiRequest(makeCategoryURL(id), {method: 'GET'})
        .then((response) => response.json())
        .then(processCategory(dispatch))
}

export const initProductListPage = (url) => (dispatch) => {
    const categoryIDMatch = /\/([^/]+)$/.exec(url)
    const categoryID = categoryIDMatch ? categoryIDMatch[1] : ''

    return dispatch(fetchCategoryInfo(categoryID))
        .then(() => makeApiRequest(makeCategorySearchURL(categoryID), {method: 'GET'}))
        .then((response) => response.json())
        .then(({hits, total}) => {
            const productListData = parseProductListData(hits)
            const products = Object.keys(productListData)

            dispatch(receiveProductListProductData(productListData))
            dispatch(receiveCategoryContents(urlToPathKey(url), {
                products,
                itemCount: total
            }))
        })
}
