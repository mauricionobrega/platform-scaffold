import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'

import {makeRequest, urlToPathKey} from '../utils/utils'
import {productDetailsParser} from '../store/products/parser'
import {receivePdpProductData} from './responses'

export const fetchPdpData = (url) => (dispatch) => {
    return makeRequest(url)
        .then(jqueryResponse)
        .then((res) => {
            const [$, $response] = res
            dispatch(receivePdpProductData({[urlToPathKey(url)]: productDetailsParser($, $response)}))
        })
        .catch((error) => { console.info(error.message) })
}
