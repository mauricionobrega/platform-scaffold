import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {makeDemandwareRequest} from '../utils'
import {receiveCategory, receiveCategoryInformation} from '../../categories/responses'
import {receiveProductListProductData} from '../../products/responses'
import {parseProductListData} from '../parsers'

import {API_END_POINT_URL, SITE_ID} from '../constants'

const makeCategoryURL = (id) => `${API_END_POINT_URL}/categories/${id}`

/* eslint-disable camelcase, no-use-before-define */
const processCategory = (dispatch) => ({parent_category_id, id, name}) => {
    const parentId = parent_category_id !== 'root' ? parent_category_id : null
    const path = `/s/${SITE_ID}/${id}`
    dispatch(receiveCategoryInformation({
        [path]: {
            id,
            title: name,
            href: path,
            parentId
        }
    }))

    if (parentId) {
        dispatch(fetchParentCategoryData(parentId))
    }
}
/* eslint-enable camelcase, no-use-before-define */

const fetchParentCategoryData = (id) => (dispatch) => {
    makeDemandwareRequest(makeCategoryURL(id), {method: 'GET'})
        .then((response) => response.json())
        .then(processCategory(dispatch))
}

export const fetchProductListData = (url) => (dispatch) => {
    const categoryIDMatch = /\/([^/]+)$/.exec(url)
    const categoryID = categoryIDMatch ? categoryIDMatch[1] : ''
    const urlPathKey = urlToPathKey(url)
    const requestOptions = {
        method: 'GET'
    }

    return makeDemandwareRequest(makeCategoryURL(categoryID), requestOptions)
        .then((response) => response.json())
        .then(processCategory(dispatch))

        .then(() => makeDemandwareRequest(`${API_END_POINT_URL}/product_search?expand=images,prices&q=&refine_1=cgid=${categoryID}`, requestOptions))
        .then((response) => response.json())
        .then(({hits, total}) => {
            const productListData = parseProductListData(hits)
            const products = Object.keys(productListData)

            dispatch(receiveProductListProductData(productListData))
            dispatch(receiveCategory({
                [urlPathKey]: {
                    products,
                    itemCount: total
                }
            }))
        })
}
