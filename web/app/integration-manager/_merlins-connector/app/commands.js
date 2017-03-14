import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {parseNavigation} from '../navigation/parser'

import {getCurrentUrl} from '../../../containers/app/selectors'
import {appParser} from './parser'
import {parseFooter} from '../footer/parser'
import {receiveNavigationData, receiveAppData, onPageReceived, receiveFooterData, setPageFetchError} from '../../responses'

export const fetchPageData = (url, routeName) => (dispatch, getState) => {
    return makeRequest(url)
        .then(jqueryResponse)
        .then((res) => {
            const [$, $response] = res
            const currentURL = getCurrentUrl(getState())
            const receivedAction = onPageReceived($, $response, url, currentURL, routeName)

            // Let app-level reducers know about receiving the page
            dispatch(receivedAction)
            dispatch(receiveAppData(appParser(receivedAction.payload.$response)))

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
