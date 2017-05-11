import {createAction} from '../../utils/utils'

// TODO - Check for existence of client before calling
export const subscribe = (channel = null) => (dispatch) => {
    window.Progressive.MessagingClient.subscribe({[channel]: true})
}

// TODO - wrapper module that lives somewhere else than here?
// TODO - write a meta action handler to dispatch changes to local storage?
export const setInStorage = (key, value) => {
    // TODO - global flag set if local storage not available on first check?
    window.Progressive.MessagingClientInitPromise.then(() => window.Progressive.MessagingClient.LocalStorage.set(key, value))
}

export const getFromStorage = (key) => {
    return window.Progressive.MessagingClientInitPromise.then(() => window.Progressive.MessagingClient.LocalStorage.get(key))
}

export const stateUpdate = createAction('[Push Messaging] state updated')

// TODO - unsubscribe
