import {createAction} from '../../utils/utils'

import * as messagingSelectors from './selectors'
import {PAGE_VISIT_COUNT} from './constants'

// TODO - Check for existence of client before calling
export const subscribe = (channels) => (dispatch) => {
    channels = channels || {default: true}
    console.info('[Messaging] Subscribed to channel:', channels)
    return window.Progressive.MessagingClient.subscribe(channels)
}

let storage

// TODO - wrapper module that lives somewhere else than here?
// TODO - write a meta action handler to dispatch changes to local storage?
export const setInStorage = (key, value) => {
    // TODO - global flag set if local storage not available on first check?
    return window.Progressive.MessagingClientInitPromise.then(() => {
        storage = Object.assign({}, {
            [key]: value
        })
        const result = window.Progressive.MessagingClient.LocalStorage.set('pwa:storage', JSON.stringify(storage))
        console.info('[Messaging] set in storage:', key, value)
        return result
    })
    .catch((err) => console.error(err))
}

export const getFromStorage = (key) => {
    return window.Progressive.MessagingClientInitPromise.then(() => {
        const result = window.Progressive.MessagingClient.LocalStorage.get(key)
        console.info('[Messaging] get from storage:', key, result)
        return JSON.parse(result)
    })
    .catch((err) => console.error(err))
}

export const rehydrateFromStore = (key) => {
    return getFromStorage('pwa:storage').then((store) => {
        if (store === null) {
            return null
        }

        return key ? store[key] : store
    })
}

export const stateUpdate = createAction('[Push Messaging] state updated')

// TODO - unsubscribe

let rehydrated = false

export const onPageVisitIncrement = createAction('Increment Page Visit Count')
// export const onPageVisitIncrement = createActionWithMeta('Increment Page Visit Count', [], () => ({persist: true}))

// TODO - Buffer actions while waiting for Messaging init promise
export const incrementPageVisitCount = (count = 1) => {
    return (dispatch, getState) => {
        dispatch(onPageVisitIncrement(count))
        const currCount = messagingSelectors.getPageVisitCount(getState())
        setInStorage(PAGE_VISIT_COUNT, currCount)
        console.info('[Messaging] Increment page visit count to:', currCount)

    }
}

// TODO - Generalize storage of specific slices of store
export const onPageVisitRehydration = createAction('Page Visit Count Rehydrated')

export const rehydratePageVisitCount = () => {
    return (dispatch) => {
        if (rehydrated) {
            return Promise.resolve()
        }

        return rehydrateFromStore(PAGE_VISIT_COUNT).then((count) => {
            console.info('[Messaging] Rehydrated page count:', count)
            rehydrated = true

            if (count !== null) {
                return dispatch(stateUpdate({[PAGE_VISIT_COUNT]: count}))
            } else {
                return Promise.resolve()
            }
        })
        .catch((e) => {
            console.error('[Messaging] error in rehydration:', e)
        })
    }
}