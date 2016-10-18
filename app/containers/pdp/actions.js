import {createAction, makeRequest} from '../../utils/utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import pdpParser from './pdp-parser'

export const receiveContents = createAction('Received Pdp Contents')

export const receiveResponse = (response) => {
    return (dispatch) => {
        jqueryResponse(response)
            .then(([$, $responseText]) => {
                dispatch(receiveContents(pdpParser($, $responseText)))
            })
    }
}

export const fetchContents = () => {
    return (dispatch) => {
        makeRequest(window.location.href)
            .then((response) => dispatch(receiveResponse(response)))
    }
}
