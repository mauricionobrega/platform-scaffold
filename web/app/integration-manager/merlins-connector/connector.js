import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'

import {makeRequest, urlToPathKey, makeFormEncodedRequest} from '../../utils/utils'
import {productDetailsParser} from '../../store/products/parser'
import {pdpAddToCartFormParser} from './parsers'
import {receivePdpProductData} from './../responses'
import {receiveFormInfo} from './../actions'

export const fetchPdpData = (url) => (dispatch) => {
    return makeRequest(url)
        .then(jqueryResponse)
        .then((res) => {
            const [$, $response] = res
            dispatch(receivePdpProductData({[urlToPathKey(url)]: productDetailsParser($, $response)}))
            dispatch(receiveFormInfo({[urlToPathKey(url)]: pdpAddToCartFormParser($, $response).formInfo}))
        })
        .catch((error) => { console.info(error.message) })
}

export const addToCart = (key, qty) => (dispatch, getStore) => {
    const formInfo = getStore().integrationManager.get(key)

    return makeFormEncodedRequest(formInfo.get('submitUrl'), {
        ...formInfo.get('hiddenInputs').toJS(),
        qty
    }, {
        method: formInfo.get('method')
    })
}
