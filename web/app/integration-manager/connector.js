import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'

import {makeRequest, urlToPathKey} from '../utils/utils'
import {pdpParser} from '../store/products/parser'
import {receivePdpProductData} from './responses'

export const fetchPdpData = (url) => (dispatch) => {
    return makeRequest(url)
        .then(jqueryResponse)
        .then((res) => {
            const [$, $response] = res
            dispatch(receivePdpProductData({[urlToPathKey(url)]: pdpParser($, $response)}))
        })
        .catch((error) => { console.info(error.message) })
}
