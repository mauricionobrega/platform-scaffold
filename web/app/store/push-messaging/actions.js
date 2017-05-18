import {createAction} from '../../utils/utils'
import StoreJS from './store'

import * as messagingSelectors from './selectors'
import {PAGE_COUNT, VISIT_COUNTDOWN} from './constants'

export const onRehydratedPageCount = createAction('[Push Messaging] Page Count Rehydrated')
export const onRehydratedVisitCountdown = createAction('[Push Messaging] Visit Countdown Rehydrated')
export const stateUpdate = createAction('[Push Messaging] state updated')
export const onVisitCountdownDecrement = createAction('[Push Messaging] Decrease Visit Countdown')
export const onPageCountIncrement = createAction('[Push Messaging] Increment Page Count')
export const onVisitCountdownSet = createAction('[Push Messaging] Visit Countdown Set')

const storage = new StoreJS('pw')
const ACTIVE_VISIT_DURATION = 6 * 60 * 60 // 6 days in seconds
const PERMA_DURATION = 365 * 24 * 60 * 60 // 1 year in seconds

/**
 * Sets a visit countdown that can be used to guard against showing Push Messaging
 * asks until X visits have elapsed
 * Is persisted in local storage for 1 year
 *
 * @param {number} count - how many visits to wait for
 */
export const setVisitCountdown = (count) => (dispatch) => {
    dispatch(onVisitCountdownSet(count))

    console.log('[Messaging] setVisitcountdown', count, PERMA_DURATION)
    storage.set(VISIT_COUNTDOWN, count, PERMA_DURATION)
}

/**
 * Triggers the system-ask dialog to ask user for permissions. If user has already
 * provided permission, subscribes or unsubscribes them to the provided channel(s).
 * Provide a key representing the channel name, and a truthy value to subscribe
 * or falsy value to unsubscribe.
 *
 * e.g.
 * {
 *   newDeals: true,
 *   priceDrops: false
 * }
 *
 * @param {object} [channels] - list of channels to un/subscribe to
 * @returns {Promise} resolves to a Push Messaging State
 */
export const subscribe = (channels) => (dispatch) => {
    channels = channels || {default: true}

    console.info('[Messaging] Channel subscription update:', channels)
    return window.Progressive.MessagingClientInitPromise
        // .then(() => dispatch(subscriptionInProgress())) // TODO: Let app know we have a subscription ongoing
        .then(() => window.Progressive.MessagingClient.subscribe(channels))
        .catch((err) => console.error(err))
}

/**
 * Informs the Push Messaging service that the given channel name was offered to the user
 * (Dispatch this action when the UI asking user to subscribe has been shown)
 *
 * @param {string} channel - the name of the channel that was shown to the user
 * @param {Promise} resolves to undefined
 */
export const channelOfferShown = (channel) => (dispatch) => {
    if (typeof channel !== 'string' || channel.length === 0) {
        console.log('[Messaging] Channel name must be specified.')
        return Promise.resolve()
    }

    return window.Progressive.MessagingClientInitPromise
        .then(() => {
            console.info(`[Messaging] Notifying client that channel ${channel} was displayed.`)
            return window.Progressive.MessagingClient.channelOfferShown(channel)
        })
        .catch((err) => console.error(err))
}

/**
 * For internal use, this adds 1 to the existing page counter and is dispatched by `onRouteChanged`
 * Also persists the value in local storage
 *
 * @param {number} [count] - the number to increment the page count by
 */
export const incrementPageCount = (count = 1) => (dispatch, getState) => {
    // First, increment the page count
    dispatch(onPageCountIncrement(count))

    // Now that we've updated the store, get the current page count
    const currCount = messagingSelectors.getPageCount(getState())

    // Finally, update localStorage with the latest page count
    console.log('[Messaging] incrementPageCount', count, currCount, ACTIVE_VISIT_DURATION)
    storage.set(PAGE_COUNT, currCount, ACTIVE_VISIT_DURATION)
}

export const rehydratePageCount = () => (dispatch, getState) => {
    const fromStore = storage.get(PAGE_COUNT)

    if (typeof fromStore !== 'undefined') {
        console.log('[Messaging] rehydratePageCount', fromStore)
        dispatch(onRehydratedPageCount(fromStore))
    } else {
        // If page count isn't in the store, it expired. So, decrease visit countdown
        let currCount = messagingSelectors.getVisitCountdown(getState())

        if (currCount !== false) {
            console.log('[Messaging] Visit countdown was', currCount, 'now is', currCount - 1)
            dispatch(setVisitCountdown(--currCount))
        }
    }
}

export const rehydrateVisitCountdown = () => (dispatch) => {
    const fromStore = storage.get(VISIT_COUNTDOWN)

    if (typeof fromStore !== 'undefined') {
        console.log('[Messaging] rehydrateVisitCountdown', fromStore)
        dispatch(onRehydratedVisitCountdown(fromStore))
    }
}
