import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {urlToPathKey} from '../../../utils/utils'
import {initDemandWareSession} from '../app/commands'
import {receiveCategory} from '../../categories/responses'
import {receiveProductListProductData} from '../../products/responses'
import {parseProductListData} from '../parsers'

import {API_END_POINT_URL, SITE_ID} from '../constants'

export const fetchProductListData = (url) => (dispatch) => {
    const categoryIDMatch = /\/([^/]+)$/.exec(url)
    const categoryID = categoryIDMatch ? categoryIDMatch[1] : ''
    const urlPathKey = urlToPathKey(url)
    return initDemandWareSession()
        .then((headers) => {
            const requestOptions = {
                method: 'GET',
                headers
            }
            makeRequest(`${API_END_POINT_URL}/categories/${categoryID}`, requestOptions)
                .then((response) => response.json())
                .then((responseJSON) => {
                    dispatch(receiveCategory({
                        [urlPathKey]: {title: responseJSON.name}
                    }))
                    if (responseJSON.parent_category_id !== 'root') {
                        makeRequest(`${API_END_POINT_URL}/categories/${responseJSON.parent_category_id}`, requestOptions)
                            .then((response) => response.json())
                            .then((responseJSON) => {
                                dispatch(receiveCategory({
                                    [urlPathKey]: {parentName: responseJSON.name, parentHref: `/s/${SITE_ID}/${responseJSON.id}`}
                                }))
                            })
                    }
                })
                .then(() => {
                    makeRequest(`${API_END_POINT_URL}/product_search?expand=images,prices&q=&refine_1=cgid=${categoryID}`, requestOptions)
                        .then((response) => response.json())
                        .then(({hits}) => {
                            const productListData = parseProductListData(hits)
                            const categoryData = {
                                products: Object.keys(productListData)
                            }

                            dispatch(receiveProductListProductData(productListData))
                            dispatch(receiveCategory({
                                [urlPathKey]: categoryData
                            }))
                        })
                })
        })
}
