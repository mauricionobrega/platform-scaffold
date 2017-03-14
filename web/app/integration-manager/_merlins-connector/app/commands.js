import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {parseNavigation} from '../navigation/parser'

import {receiveNavigationData} from '../../responses'

export const fetchPageData = (url) => (dispatch) => {
    return makeRequest(url)
        .then(jqueryResponse)
        .then((res) => {
            const [$, $response] = res
            dispatch(receiveNavigationData(parseNavigation($, $response)))
            return res
        })
}
