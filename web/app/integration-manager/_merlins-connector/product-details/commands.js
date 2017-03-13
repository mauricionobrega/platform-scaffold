import {urlToPathKey} from '../../../utils/utils'
import {productDetailsParser} from '../../../store/products/parser'
import {receiveFormInfo} from '../../actions'
import {receivePdpProductData} from '../../responses'

import {fetchPageData} from '../utils'

import {pdpAddToCartFormParser} from './parsers'

export const fetchPdpData = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then((res) => {
            const [$, $response] = res
            dispatch(receivePdpProductData({[urlToPathKey(url)]: productDetailsParser($, $response)}))
            dispatch(receiveFormInfo({[urlToPathKey(url)]: pdpAddToCartFormParser($, $response).formInfo}))
        })
        .catch((error) => { console.info(error.message) })
}

