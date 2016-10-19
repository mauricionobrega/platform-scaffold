import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import * as utils from '../../utils/utils'

export const onPageReceived = utils.createAction('On page received',
    '$',
    '$response'
)

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
