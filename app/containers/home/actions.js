import {createAction} from '../../utils/utils'
import {jqueryResponse} from 'progressive-web-sdk/jquery-response'
import homeParser from './parsers/home'

export const receiveHomeContents = createAction('Received Home Contents')

export const fetchHomeContents = () => {
    return (dispatch) => {
        fetch('/')
            .then((response) => jqueryResponse(response))
            .then(($responseText) => {
                dispatch(receiveHomeContents(homeParser($responseText)))
            })
    }
}
