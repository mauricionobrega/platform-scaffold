import {createAction} from '../../utils/utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import homeParser from './parsers/home'

export const receiveHomeContents = createAction('Received Home Contents')

export const fetchHomeContents = () => {
    return (dispatch) => {
        fetch('/')
            .then((response) => jqueryResponse(response))
            .then(([$, $response]) => {
                dispatch(receiveHomeContents(homeParser($, $response)))
            })
    }
}
