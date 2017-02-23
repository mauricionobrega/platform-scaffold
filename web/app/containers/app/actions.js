import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import * as utils from '../../utils/utils'
import * as selectors from './selectors'

import appParser from './app-parser'

import {ESTIMATE_FORM_NAME} from '../cart/constants'
import {SHIPPING_FORM_NAME} from '../checkout-shipping/constants'

import Cart from '../cart/container'
import CheckoutShipping from '../checkout-shipping/container'
import CheckoutPayment from '../checkout-payment/container'
import Home from '../home/container'
import Login from '../login/container'
import ProductDetails from '../product-details/container'
import ProductList from '../product-list/container'
import * as checkoutActions from '../../store/checkout/actions'
import * as checkoutShippingUIActions from '../checkout-shipping/actions'
import * as checkoutShippingActions from '../../store/checkout/shipping/actions'
import * as homeActions from '../home/actions'
import * as loginActions from '../login/actions'
import * as productDetailsActions from '../product-details/actions'
import * as footerActions from '../footer/actions'
import * as navigationActions from '../navigation/actions'
import * as productsActions from '../../store/products/actions'
import * as categoriesActions from '../../store/categories/actions'

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

export const receiveData = utils.createAction('Receive App Data')
export const process = ({payload: {$response}}) => {
    return receiveData(appParser($response))
}

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
                dispatch(process(receivedAction))
                if (pageComponent === Home) {
                    dispatch(homeActions.process(receivedAction))
                } else if (pageComponent === Login) {
                    dispatch(loginActions.process(receivedAction))
                } else if (pageComponent === ProductDetails) {
                    dispatch(productDetailsActions.process(receivedAction))
                    dispatch(productsActions.processProductDetails(receivedAction))
                } else if (pageComponent === ProductList) {
                    dispatch(categoriesActions.process(receivedAction))
                    dispatch(productsActions.processProductList(receivedAction))
                } else if (pageComponent === CheckoutShipping) {
                    dispatch(checkoutShippingUIActions.process(receivedAction))
                    dispatch(checkoutActions.processCheckoutData(receivedAction))
                    dispatch(checkoutShippingActions.fetchShippingMethodsEstimate(SHIPPING_FORM_NAME))
                } else if (pageComponent === Cart) {
                    dispatch(checkoutActions.processCartCheckoutData(receivedAction))
                    dispatch(checkoutShippingActions.fetchShippingMethodsEstimate(ESTIMATE_FORM_NAME))
                } else if (pageComponent === CheckoutPayment) {
                    dispatch(checkoutActions.processCheckoutData(receivedAction))
                }
                dispatch(footerActions.process(receivedAction))
                dispatch(navigationActions.process(receivedAction))
            })
            .catch((error) => { console.error(error.message) })
    }
}
