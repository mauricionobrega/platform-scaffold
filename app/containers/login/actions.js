import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {createAction} from '../../utils/utils'
import loginParser from './parsers/login'

export const receiveLoginContents = createAction('Login page contents received')

export const fetchLoginContents = () => {
    return (dispatch) => {
        fetch(window.location.href, {
            credentials: 'same-origin',
        })
        .then((response) => {
            if (response.url !== window.location.href) {
                window.location.href = response.location
                return false
            } else {
                return jqueryResponse(response)
            }
        })
        .then(([$, $response]) => {
            dispatch(receiveLoginContents(loginParser($, $response)))
        })
    }
}
