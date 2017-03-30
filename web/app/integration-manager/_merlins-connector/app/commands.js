import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'

import {getCart} from '../cart/commands'
import {appParser} from './parser'
import {parseFooter} from '../footer/parser'
import {parseNavigation} from '../navigation/parser'
import {receiveFormKey} from '../actions'
import {receiveNavigationData, receiveAppData, receiveFooterData, setPageFetchError, setCheckoutURL} from '../../responses'
import {CHECKOUT_URL} from '../constants'

export const fetchPageData = (url) => (dispatch) => {
    return makeRequest(url)
        .then(jqueryResponse)
        .then((res) => {
            const [$, $response] = res
            const appData = appParser($response)
            dispatch(receiveFormKey(appData.formKey))
            dispatch(receiveAppData({...appData}))
            dispatch(receiveNavigationData(parseNavigation($, $response)))
            dispatch(receiveFooterData(parseFooter($, $response)))
            return res
        })
        .catch((error) => {
            console.info(error.message)
            if (error.name !== 'FetchError') {
                throw error
            } else {
                dispatch(setPageFetchError(error.message))
            }
        })
}

export const initApp = () => (dispatch) => {
    dispatch(setCheckoutURL(CHECKOUT_URL))
    return dispatch(getCart())
}
