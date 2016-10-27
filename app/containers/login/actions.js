import {createAction} from '../../utils/utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {onPageReceived} from '../app/actions'

export const loginSuccess = (response) => {
    return (dispatch) => {
        window.location.href = 'customer/account'
    }
}

export const loginFailure = (response) => {
    return (dispatch) => {
        return jqueryResponse(response)
            .then(([$, $responseText]) => dispatch(onPageReceived($, $responseText)))
    }
}
