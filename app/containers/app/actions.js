import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import * as utils from '../../utils/utils'


/**
 * Action dispatched when the route changes
 */
export const onRouteChanged = utils.createAction('On route changed', 'pageType')

/**
 * Action dispatched when content for a global page render is ready.
 */
export const onPageReceived = utils.createAction('On page received',
    '$',
    '$response',
    'pageType'
)


/**
 * Fetch the content for a 'global' page render. This should be driven
 * by react-router, ideally.
 */
export const fetchPage = (url, pageType) => {
    return (dispatch) => {
        utils.makeRequest(url)
            .then(jqueryResponse)
            .then((res) => {
                const [$, $response] = res
                dispatch(onPageReceived($, $response, pageType))
            })
            .catch((error) => { console.info(error.message) })
    }
}
