import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {makeDemandwareRequest} from '../utils'
import {receiveCategory} from '../../categories/responses'
import {receiveProductListProductData} from '../../products/responses'
import {parseProductListData} from '../parsers'

import {API_END_POINT_URL, SITE_ID} from '../constants'

export const fetchProductListData = (url) => (dispatch) => {
    const categoryIDMatch = /\/([^/]+)$/.exec(url)
    const categoryID = categoryIDMatch ? categoryIDMatch[1] : ''
    const urlPathKey = urlToPathKey(url)
    const requestOptions = {
        method: 'GET'
    }

    return makeDemandwareRequest(`${API_END_POINT_URL}/categories/${categoryID}`, requestOptions)
        .then((response) => response.json())
        .then((responseJSON) => {
            dispatch(receiveCategory({
                [urlPathKey]: {title: responseJSON.name}
            }))

            if (responseJSON.parent_category_id !== 'root') {
                makeDemandwareRequest(`${API_END_POINT_URL}/categories/${responseJSON.parent_category_id}`, requestOptions)
                    .then((response) => response.json())
                    .then((responseJSON) => {
                        dispatch(receiveCategory({
                            [urlPathKey]: {parentName: responseJSON.name, parentHref: `/s/${SITE_ID}/${responseJSON.id}`}
                        }))
                    })
            }
        })
        .then(() => makeDemandwareRequest(`${API_END_POINT_URL}/product_search?expand=images,prices&q=&refine_1=cgid=${categoryID}`, requestOptions))
        .then((response) => response.json())
        .then(({hits}) => {
            const productListData = parseProductListData(hits)

            dispatch(receiveProductListProductData(productListData))
            dispatch(receiveCategory({
                [urlPathKey]: {
                    products: Object.keys(productListData)
                }
            }))
        })
}
