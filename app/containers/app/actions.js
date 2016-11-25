import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import * as utils from '../../utils/utils'
import {CURRENT_URL} from './constants'

/**
 * Action dispatched when the route changes
 * @param {string} pageType - the component name of the entered route
 * @param {string} currentURL - what's currently shown in the address bar
 */
export const onRouteChanged = utils.createAction('On route changed', 'currentURL', 'pageType')

/**
 * Action dispatched when content for a global page render is ready.
 *
 * @param {object} $ - a selector library like jQuery
 * @param {object} $response - a jQuery-wrapped DOM object
 * @param {string} pageType - the component name of the page received
 * @param {string} url - the URL of the page received
 * @param {string} currentURL - what's currently shown in the address bar
 */
export const onPageReceived = utils.createAction('On page received',
    '$',
    '$response',
    'pageType',
    'url',
    'currentURL',
    'routeName'
)

/**
 * Fetch the content for a 'global' page render. This should be driven
 * by react-router, ideally.
 */
export const fetchPage = (url, pageType, routeName) => {
    return (dispatch, getState) => {
        utils.makeRequest(url)
            .then(jqueryResponse)
            .then((res) => {
                const [$, $response] = res
                const currentURL = getState().app.get(CURRENT_URL)
                dispatch(onPageReceived($, $response, pageType, url, currentURL, routeName))
            })
            .catch((error) => { console.info(error.message) })
    }
}
