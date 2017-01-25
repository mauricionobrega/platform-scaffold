import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import * as utils from '../../utils/utils'
import * as selectors from './selectors'
import {isPageType} from '../../utils/router-utils'

import Home from '../home/container'
import Login from '../login/container'
import PDP from '../pdp/container'
import PLP from '../plp/container'
import * as homeActions from '../home/actions'
import * as loginActions from '../login/actions'
import * as pdpActions from '../pdp/actions'
import * as plpActions from '../plp/actions'
import * as footerActions from '../footer/actions'
import * as navigationActions from '../navigation/actions'
import * as productsActions from '../catalog/products/actions'

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
    'url',
    'currentURL',
    'routeName'
)

export const completeFetch = utils.createAction('Fetch is completed')


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
                const currentURL = selectors.getCurrentUrl(getState())
                const receivedAction = onPageReceived($, $response, url, currentURL, routeName)
                if (isPageType(pageComponent, Home)) {
                    dispatch(homeActions.process(receivedAction))
                } else if (isPageType(pageComponent, Login)) {
                    dispatch(loginActions.process(receivedAction))
                } else if (isPageType(pageComponent, PDP)) {
                    dispatch(pdpActions.process(receivedAction))
                    dispatch(productsActions.processPdp(receivedAction))
                } else if (isPageType(pageComponent, PLP)) {
                    dispatch(plpActions.process(receivedAction))
                    dispatch(productsActions.processPlp(receivedAction))
                }
                dispatch(footerActions.process(receivedAction))
                dispatch(navigationActions.process(receivedAction))
                dispatch(completeFetch())
            })
            .catch((error) => { console.info(error.message) })
    }
}
