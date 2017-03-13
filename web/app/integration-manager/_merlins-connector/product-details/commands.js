import {urlToPathKey} from '../../../utils/utils'
import {receiveFormInfo} from '../../actions'

import {fetchPageData} from '../utils'

import {receiveProductDetailsProductData, receiveProductDetailsUIData} from '../../product-details/responses'
import {productDetailsParser, productDetailsUIParser, pdpAddToCartFormParser} from './parsers'

export const fetchPdpData = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then((res) => {
            const [$, $response] = res

            const pathKey = urlToPathKey(url)

            dispatch(receiveProductDetailsUIData({[pathKey]: productDetailsUIParser($, $response)}))
            dispatch(receiveProductDetailsProductData({[pathKey]: productDetailsParser($, $response)}))
            dispatch(receiveFormInfo({[pathKey]: pdpAddToCartFormParser($, $response).formInfo}))
        })
        .catch((error) => { console.info(error.message) })
}

