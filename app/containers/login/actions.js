import {createAction} from '../../utils/utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'

import loginParser from './parsers/login'

export const receiveLoginContents = createAction('Login page contents received')

export const fetchContents = () => {
    return (dispatch) => {
        fetch('/')
            .then((response) => jqueryResponse(response))
            .then(([$, $response]) => {
                dispatch(receiveLoginContents(loginParser($, $response)))
            })
    }
}
