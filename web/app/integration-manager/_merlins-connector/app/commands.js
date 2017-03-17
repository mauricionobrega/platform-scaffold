import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {parseNavigation} from '../navigation/parser'

import {appParser} from './parser'
import {parseFooter} from '../footer/parser'
import {receiveNavigationData, receiveAppData, receiveFooterData, setPageFetchError} from '../../responses'

export const fetchPageData = (url) => (dispatch) => {
    return makeRequest(url)
        .then(jqueryResponse)
        .then((res) => {
            const [$, $response] = res

            dispatch(receiveAppData(appParser($response)))
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
