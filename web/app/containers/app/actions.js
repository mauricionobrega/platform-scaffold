/* eslint-disable import/namespace */
/* eslint-disable import/named */
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'

import * as analyticConstants from 'progressive-web-sdk/dist/analytics/analytic-constants'

import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import {createAction, createActionWithMeta, createAnalyticsMeta} from '../../utils/utils'
import {getCurrentUrl} from './selectors'

import appParser from './app-parser'

import {ESTIMATE_FORM_NAME} from '../cart/constants'
import {SHIPPING_FORM_NAME} from '../checkout-shipping/constants'

import {
    UnwrappedCart,
    UnwrappedCheckoutConfirmation,
    UnwrappedCheckoutPayment,
    UnwrappedCheckoutShipping,
    UnwrappedLogMeIn,
    UnwrappedLogin,
    UnwrappedStartersKit,
    UnwrappedProductDeets,
    UnwrappedProductDetails,
    UnwrappedProductList
} from '../templates'

import Home from '../home/container'

import * as checkoutActions from '../../store/checkout/actions'
import * as checkoutConfirmationActions from '../checkout-confirmation/actions'
import * as checkoutShippingUIActions from '../checkout-shipping/actions'
import * as checkoutShippingActions from '../../store/checkout/shipping/actions'
import * as cartActions from '../../store/cart/actions'
import * as homeActions from '../home/actions'
import * as logMeInActions from '../log-me-in/actions'
import * as loginActions from '../login/actions'
import * as startersKitActions from '../starters-kit/actions'
import * as productDeetsActions from '../product-deets/actions'
import * as productDetailsActions from '../product-details/actions'
import * as footerActions from '../footer/actions'
import * as navigationActions from '../navigation/actions'
import * as productsActions from '../../store/products/actions'
import * as categoriesActions from '../../store/categories/actions'

import {OFFLINE_ASSET_URL} from './constants'
import {closeModal} from '../../store/modals/actions'
import {OFFLINE_MODAL} from '../offline/constants'

let isInitialEntryToSite = true

export const addNotification = createAction('Add Notification')
export const removeNotification = createAction('Remove Notification')
export const removeAllNotifications = createAction('Remove All Notifications')

export const updateSvgSprite = createAction('Updated SVG sprite', 'sprite')

/**
 * Action dispatched when the route changes
 * @param {string} currentURL - what's currently shown in the address bar
 * @param {string} routeName - Template name for analytic
 */
export const onRouteChanged = createActionWithMeta(
    'On route changed',
    ['currentURL'],
    (currentURL, routeName) => createAnalyticsMeta(analyticConstants.pageview, {name: routeName}))

/**
 * Action dispatched when content for a global page render is ready.
 *
 * @param {object} $ - a selector library like jQuery
 * @param {object} $response - a jQuery-wrapped DOM object
 * @param {string} url - the URL of the page received
 * @param {string} currentURL - what's currently shown in the address bar
 * @param {string} routeName - the name of the route we received the page for
 */
export const onPageReceived = createAction('On page received',
    '$',
    '$response',
    'url',
    'currentURL',
    'routeName'
)

export const receiveData = createAction('Receive App Data')
export const process = ({payload: {$response}}) => {
    return receiveData(appParser($response))
}

export const setPageFetchError = createAction('Set page fetch error', 'fetchError')
export const clearPageFetchError = createAction('Clear page fetch error')

/**
 * Make a separate request that is intercepted by the worker. The worker will
 * return a JSON object where `{offline: true}` if the request failed, which we
 * can use to detect if we're offline.
 */
export const checkIfOffline = () => {
    return (dispatch) => {
        // we need to cachebreak every request to ensure we don't get something
        // stale from the disk cache on the device - the CDN will ignore query
        // parameters for this asset, however
        return fetch(`${OFFLINE_ASSET_URL}?${Date.now()}`, {
            cache: 'no-store'
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.offline) {
                    dispatch(setPageFetchError('Network failure, using worker cache'))
                } else {
                    dispatch(clearPageFetchError())
                    dispatch(closeModal(OFFLINE_MODAL))
                }
            })
            .catch((error) => {
                // In cases where we don't have the worker installed, this means
                // we indeed have a network failure, so switch on offline
                dispatch(setPageFetchError(error.message))
            })
    }
}

const requestCapturedDoc = () => {
    return window.Progressive.capturedDocHTMLPromise.then((initialCapturedDocHTML) => {
        const body = new Blob([initialCapturedDocHTML], {type: 'text/html'})
        const capturedDocResponse = new Response(body, {
            status: 200,
            statusText: 'OK'
        })

        return Promise.resolve(capturedDocResponse)
    })
}

/**
 * Fetch the content for a 'global' page render. This should be driven
 * by react-router, ideally.
 */
export const fetchPage = (url, pageComponent, routeName, fetchUrl) => {
    return (dispatch, getState) => {
        const isNotTestingEnvironment = !!window.Progressive
        const request = isInitialEntryToSite && isNotTestingEnvironment
            ? requestCapturedDoc()
            : makeRequest(fetchUrl || url)
        isInitialEntryToSite = false

        return request
            .then(jqueryResponse)
            .then((res) => {
                const [$, $response] = res
                const currentURL = getCurrentUrl(getState())
                const receivedAction = onPageReceived($, $response, url, currentURL, routeName)

                // Let app-level reducers know about receiving the page
                dispatch(receivedAction)
                dispatch(process(receivedAction))

                if (pageComponent === Home) {
                    dispatch(homeActions.process(receivedAction))
                } else if (pageComponent === UnwrappedLogMeIn) {
                    dispatch(logMeInActions.process(receivedAction))
                } else if (pageComponent === UnwrappedLogin) {
                    dispatch(loginActions.process(receivedAction))
                } else if (pageComponent === UnwrappedStartersKit) {
                    dispatch(categoriesActions.process(receivedAction))
                    dispatch(productsActions.processProductList(receivedAction))
                    dispatch(startersKitActions.process(receivedAction))
                } else if (pageComponent === UnwrappedProductDeets) {
                    dispatch(productDeetsActions.process(receivedAction))
                    dispatch(productsActions.processProductDetails(receivedAction))
                } else if (pageComponent === UnwrappedProductDetails) {
                    dispatch(productDetailsActions.process(receivedAction))
                    dispatch(productsActions.processProductDetails(receivedAction))
                } else if (pageComponent === UnwrappedProductList) {
                    dispatch(categoriesActions.process(receivedAction))
                    dispatch(productsActions.processProductList(receivedAction))
                } else if (pageComponent === UnwrappedCheckoutShipping) {
                    dispatch(checkoutShippingUIActions.process(receivedAction))
                    dispatch(checkoutActions.processCheckoutData(receivedAction))
                    dispatch(checkoutShippingActions.fetchShippingMethodsEstimate(SHIPPING_FORM_NAME))
                } else if (pageComponent === UnwrappedCart) {
                    dispatch(checkoutActions.processCartCheckoutData(receivedAction))
                    dispatch(checkoutShippingActions.fetchShippingMethodsEstimate(ESTIMATE_FORM_NAME))
                } else if (pageComponent === UnwrappedCheckoutPayment) {
                    dispatch(checkoutActions.processCheckoutData(receivedAction))
                } else if (pageComponent === UnwrappedCheckoutConfirmation) {
                    dispatch(checkoutConfirmationActions.process(receivedAction))
                    // Resets the cart count to 0
                    dispatch(cartActions.getCart())
                }
                dispatch(footerActions.process(receivedAction))
                dispatch(navigationActions.process(receivedAction))

                // Finally, let's check if we received a cached response from the
                // worker, but are in fact 'offline'
                dispatch(checkIfOffline())
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
}

/**
 * Until the day that the `use` element's cross-domain issues are fixed, we are
 * forced to fetch the SVG Sprite's XML as a string and manually inject it into
 * the DOM. See here for details on the issue with `use`:
 * @URL: https://bugs.chromium.org/p/chromium/issues/detail?id=470601
 */
export const fetchSvgSprite = () => {
    return (dispatch) => {
        const spriteUrl = getAssetUrl('static/svg/sprite-dist/sprite.svg')
        return makeRequest(spriteUrl)
            .then((response) => response.text())
            .then((text) => dispatch(updateSvgSprite(text)))
    }
}


export const signOut = () => {
    return (dispatch) => {
        return makeRequest('/customer/account/logout/')
            .then(() => {
                // Desktop's message includes 'redirect to home page' message
                // so we'll just hardcode a message instead
                dispatch(addNotification({
                    content: 'You are now signed out',
                    id: 'signedOutNotification'
                }))
                dispatch(cartActions.getCart())

                // Update navigation menu
                // Need to request current location so when we are on Potions PLP
                // the potions nav item will render as 'active'
                return makeRequest(window.location.href)
                    .then(jqueryResponse)
                    .then((res) => {
                        const [$, $response] = res
                        dispatch(navigationActions.process({payload: {$, $response}}))
                    })
            })
    }
}
