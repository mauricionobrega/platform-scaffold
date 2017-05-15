/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {handleActions} from 'redux-actions'
import {fromJS} from 'immutable'
import {mergePayload} from '../../utils/reducer-utils'
import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'

import * as appActions from './actions'

import {setPageFetchError, setCheckoutShippingURL, setCartURL, setLoggedIn, setCurrentURL} from '../../integration-manager/results'
import {CURRENT_URL, FETCHED_PATHS} from './constants'

export const initialState = fromJS({
    [CURRENT_URL]: window.location.href,
    fetchError: null,
    [FETCHED_PATHS]: {},
    sprite: ''
})

export default handleActions({
    [setPageFetchError]: mergePayload,
    [setCheckoutShippingURL]: mergePayload,
    [setCartURL]: mergePayload,
    [setCurrentURL]: mergePayload,
    [setLoggedIn]: mergePayload,

    [appActions.onRouteChanged]: mergePayload,
    [appActions.setFetchedPage]: (state, {payload: {url}}) => state.setIn([FETCHED_PATHS, urlToPathKey(url)], true),
    [appActions.clearPageFetchError]: (state) => state.set('fetchError', null),
    [appActions.updateSvgSprite]: mergePayload
}, initialState)
