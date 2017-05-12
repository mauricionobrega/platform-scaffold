import {createAction} from '../../utils/utils'

// TODO - Check for existence of client before calling
export const subscribe = (channels) => (dispatch) => {
    channels = channels || {default: true}
    return window.Progressive.MessagingClient.subscribe(channels)
}

// TODO - wrapper module that lives somewhere else than here?
// TODO - write a meta action handler to dispatch changes to local storage?
export const setInStorage = (key, value) => {
    // TODO - global flag set if local storage not available on first check?
    window.Progressive.MessagingClientInitPromise.then(() => {
        const result = window.Progressive.MessagingClient.LocalStorage.set(key, value)
        console.info('[Messaging] set in storage:', key, value)
        return result
    })
}

export const getFromStorage = (key) => {
    return window.Progressive.MessagingClientInitPromise.then(() => {
        const result = window.Progressive.MessagingClient.LocalStorage.get(key)
        console.info('[Messaging] get from storage:', key, result)
        return result
    })
}

export const stateUpdate = createAction('[Push Messaging] state updated')

// TODO - unsubscribe
