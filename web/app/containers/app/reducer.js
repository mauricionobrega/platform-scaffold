import {handleActions} from 'redux-actions'
import {fromJS, List} from 'immutable'
import {mergePayloadForActions, mergePayload} from '../../utils/reducer-utils'
import {urlToPathKey} from '../../utils/utils'

import * as appActions from './actions'
import {CURRENT_URL, FETCHED_PATHS} from './constants'

const initialState = fromJS({
    [CURRENT_URL]: window.location.href,
    notifications: [],
    fetchError: null,
    [FETCHED_PATHS]: {},
    sprite: '',
    lazyLoadImages: {}
})

export default handleActions({
    ...mergePayloadForActions(appActions.receiveData),
    [appActions.onRouteChanged]: (state, {payload: {currentURL}}) => {
        return state.set(CURRENT_URL, currentURL)
    },
    [appActions.onPageReceived]: (state, {payload: {url}}) => {
        const path = urlToPathKey(url)
        return state.setIn([FETCHED_PATHS, path], true)
    },
    [appActions.addNotification]: (state, {payload}) => {
        return state.update('notifications', (notifications) => {
            // Don't allow duplicate notifications to be added
            return notifications.every(({id}) => id !== payload.id) ? notifications.push(payload) : notifications
        })
    },
    [appActions.removeNotification]: (state, {payload}) => {
        return state.update('notifications', (notifications) => {
            return notifications.filterNot(({id}) => id === payload)
        })
    },
    [appActions.removeAllNotifications]: (state) => {
        return state.set('notifications', List())
    },
    [appActions.setPageFetchError]: mergePayload,
    [appActions.clearPageFetchError]: (state) => {
        return state.set('fetchError', null)
    },
    [appActions.updateSvgSprite]: (state, {payload}) => {
        return state.set('sprite', payload.sprite)
    },
    [appActions.showLazyLoadedImage]: (state, {payload: {identifier, src}}) => {
        return state.mergeDeep({
            lazyLoadImages: {
                // identifier: the category that the image belongs to on the
                //      homepage. Could be `promoImage`, `categoryImage`, or
                //      'articleImage'
                // src: is the image's src and acts as a dictionary key. The
                //      key's value is used to indicate whether or not the image
                //      should render.
                //
                // See the `lazyLoadedImage` function in the home container for
                // where this is used.
                //
                // See ticket WEB-1204
                [identifier]: {[src]: true}
            }
        })
    }
}, initialState)
