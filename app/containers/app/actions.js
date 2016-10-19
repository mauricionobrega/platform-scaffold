import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import * as utils from '../../utils/utils'

export const ON_PAGE_RECEIVED = 'ON_PAGE_RECEIVED'

export const onPageReceived = ($, $response) => {
    return {
        type: ON_PAGE_RECEIVED,
        $,
        $response
    }
}

export const fetchPage = (url) => {
    return (dispatch) => {
        utils.makeRequest(url)
            .then(jqueryResponse)
            .then((res) => {
                const [$, $response] = res
                dispatch(onPageReceived($, $response))
            })
            .catch((error) => { console.info(error.message) })
    }
}
