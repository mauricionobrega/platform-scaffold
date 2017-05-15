/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable import/namespace */
/* eslint-disable import/named */
import * as analyticConstants from 'progressive-web-sdk/dist/analytics/analytic-constants'

import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import {createAction, createActionWithAnalytics} from 'progressive-web-sdk/dist/utils/action-creation'

import {logout} from '../../integration-manager/login/commands'
import {setPageFetchError} from '../../integration-manager/results'

import {CURRENT_URL, OFFLINE_ASSET_URL} from './constants'
import {closeModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {OFFLINE_MODAL} from '../offline/constants'

export const addNotification = createAction('Add Notification')
export const removeNotification = createAction('Remove Notification')
export const removeAllNotifications = createAction('Remove All Notifications')

export const updateSvgSprite = createAction('Updated SVG sprite', ['sprite'])

/**
 * Action dispatched when the route changes
 * @param {string} currentURL - what's currently shown in the address bar
 * @param {string} routeName - Template name for analytic
 */
export const onRouteChanged = createActionWithAnalytics(
    'On route changed',
    [CURRENT_URL],
    analyticConstants.pageview,
    (currentURL, routeName) => ({name: routeName})
)

export const setFetchedPage = createAction('Set fetched page', ['url'])
export const clearPageFetchError = createAction('Clear page fetch error')

/**
 * Make a separate request that is intercepted by the worker. The worker will
 * return a JSON object where `{offline: true}` if the request failed, which we
 * can use to detect if we're offline.
 */
export const checkIfOffline = () => (dispatch) => {
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

/**
 * Until the day that the `use` element's cross-domain issues are fixed, we are
 * forced to fetch the SVG Sprite's XML as a string and manually inject it into
 * the DOM. See here for details on the issue with `use`:
 * @URL: https://bugs.chromium.org/p/chromium/issues/detail?id=470601
 */
export const fetchSvgSprite = () => (dispatch) => {
    const spriteUrl = getAssetUrl('static/svg/sprite-dist/sprite.svg')
    return makeRequest(spriteUrl)
        .then((response) => response.text())
        .then((text) => dispatch(updateSvgSprite(text)))
}


export const signOut = () => (dispatch) => (
    dispatch(logout()).then(() => {
        // Desktop's message includes 'redirect to home page' message
        // so we'll just hardcode a message instead
        dispatch(addNotification({
            content: 'You are now signed out',
            id: 'signedOutNotification'
        }))
    })
)
