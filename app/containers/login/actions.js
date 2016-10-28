import {createAction} from '../../utils/utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {onPageReceived} from '../app/actions'

export const loginSuccess = (response) => {
    return (dispatch, getStore) => {
        window.location.href = '/customer/account'
    }
}

export const loginFailure = (response) => {
    return (dispatch, getStore) => {
        return jqueryResponse(response)
            .then(([$, $responseText]) => dispatch(onPageReceived($, $responseText))) //TODO: parse error
    }
}

export const registerSuccess = (response) => {
    return (dispatch, getStore) => {
    }
}

export const registerFailure = (response) => {
    return (dispatch, getStore) => {
    }
}
