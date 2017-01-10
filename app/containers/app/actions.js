import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import * as utils from '../../utils/utils'
import {CURRENT_URL} from './constants'

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

export const setPageFetchError = utils.createAction('Set page fetch error', 'fetchError')
export const clearPageFetchError = utils.createAction('Clear page fetch error')

/**
 * Fetch the content for a 'global' page render. This should be driven
 * by react-router, ideally.
 */
export const fetchPage = (url, pageComponent, routeName) => {
    return (dispatch, getState) => {
        let isOffline = false
        return utils.makeRequest(url)
            .then((response) => {
                isOffline = response.headers.get('x-mobify-progressive') === 'offline'
                return response
            })
            .then(jqueryResponse)
            .then((res) => {
                const [$, $response] = res
                const currentURL = getState().app.get(CURRENT_URL)

                if (isOffline) {
                    dispatch(addNotification({
                        content: 'THIS IS THE OFFLINE MESSAGE TEXT',
                        id: 'offline-mode',
                        showRemoveButton: true
                    }))
                } else {
                    dispatch(clearPageFetchError())
                }
                dispatch(onPageReceived($, $response, pageComponent, url, currentURL, routeName))
            })
            .catch((error) => {
                console.info(error.message)
                dispatch(setPageFetchError({message: error.message}))
            })
    }
}
