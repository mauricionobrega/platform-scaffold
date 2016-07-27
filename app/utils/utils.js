import {createAction as actionCreator} from 'redux-act'

// simplify redux-act createAction method.
// usage: createAction('Update Campaign', 'id', 'update')
// instead of: createAction('Update Campaign', (id, update) => ({id, update}))
export const createAction = (description, ...argNames) => {
    let payloadReducer

    if (argNames.length) {
        payloadReducer = (...args) => {
            const payload = {}

            argNames.forEach((arg, index) => {
                payload[arg] = args[index]
            })

            return payload
        }
    }

    return actionCreator(description, payloadReducer)
}

let captureLoaded = typeof window.Capture !== 'undefined'
const escape = (responseText, prefix = 'x-') => {
    if (captureLoaded) {
        captureLoaded = true
        return window.Capture.disable(responseText, prefix)
    } else {
        return escape(responseText, prefix)
    }
}

/* eslint-disable no-undef, max-len */
export const wrapResponse = (response) => response.text()
    .then((responseText) => {
        return new Promise((resolve) => {
            $(resolve($('<div>').append(escape(responseText))))
        })
    })
/* eslint-enable no-undef, max-len */
