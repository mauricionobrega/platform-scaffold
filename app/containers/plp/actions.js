import {createAction} from '../../utils/utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'

import plpParser from './parsers/plp'

export const receivePlpContents = createAction('Received Plp Contents')

export const fetchPlpContents = () => {
    return (dispatch) => {
        const url = window.location.href

        fetch(url)
            .then((response) => jqueryResponse(response))
            .then(([$, $response]) => {
                dispatch(receivePlpContents(plpParser($, $response)))
            })
    }
}
