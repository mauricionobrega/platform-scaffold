import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import * as utils from '../../utils/utils'
import {CURRENT_URL} from './constants'

import {pdpParser} from '../catalog/products/parser'

export const addNotification = utils.createAction('Add Notification')
export const removeNotification = utils.createAction('Remove Notification')
export const removeAllNotifications = utils.createAction('Remove All Notifications')

/**
 * Action dispatched when the route changes
 * @param {string} pageComponent - the component of the entered route
 * @param {string} currentURL - what's currently shown in the address bar
 */
export const onRouteChanged = utils.createAction('On route changed', 'currentURL', 'pageComponent')

/**
 * Action dispatched when content for a global page render is ready.
 *
 * @param {object} $ - a selector library like jQuery
 * @param {object} $response - a jQuery-wrapped DOM object
 * @param {string} pageComponent - the component of the page received
 * @param {string} url - the URL of the page received
 * @param {string} currentURL - what's currently shown in the address bar
 */
export const onPageReceived = utils.createAction('On page received',
    '$',
    '$response',
    'pageComponent',
    'url',
    'currentURL',
    'routeName'
)

/**
 * Fetch the content for a 'global' page render. This should be driven
 * by react-router, ideally.
 */
export const fetchPage = (url, pageComponent, routeName) => {
    return (dispatch, getState) => {
        return utils.makeRequest(url)
            .then(jqueryResponse)
            .then((res) => {
                const [$, $response] = res
                const currentURL = getState().app.get(CURRENT_URL)
                dispatch(onPageReceived($, $response, pageComponent, url, currentURL, routeName))
            })
            .catch((error) => { console.info(error.message) })
    }
}

const clippyAPI = 'https://mobify-merlin-clippy.herokuapp.com/talk'

export const receiveMessageFromUser = utils.createAction('Receive message from User')
export const receiveMessageFromClippy = utils.createAction('Receive message from Clippy')

export const receiveProductInMessage = utils.createAction('Receive product in message')

// required to make session sticky
let watsonChatContext = {}

export const sendMessageToClippy = (message) => {
    return (dispatch) => {
        dispatch(receiveMessageFromUser(message))

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message,
                context: watsonChatContext
            })
        }
        return utils.makeRequest(clippyAPI, options)
            .then((response) => response.json())
            .then((json) => {
                watsonChatContext = json.context

                if (json.isPDP) {
                    // fetch the PDP and show a preview of it
                    // shouldn't wait for the fetch to show clippy's response
                    // should the product preview come as a different message?
                    // ideally just show a loading indicator
                    // and update the message after the fact

                    // use the url to determine which product has loaded
                    // because multiple requests should be able to make use of the same load
                    // ideally use the catalog but like
                    // that's hard

                    utils.makeRequest(json.redirectURL)
                        .then(jqueryResponse)
                        .then(([$, $responseText]) => {
                            const payload = {
                                data: pdpParser($, $responseText),
                                url: json.redirectURL
                            }

                            dispatch(receiveProductInMessage(payload))
                        })
                }

                dispatch(receiveMessageFromClippy(json))
            })
            .catch(() => {
                dispatch(receiveMessageFromClippy('Network error, please try again'))
            })
    }
}
