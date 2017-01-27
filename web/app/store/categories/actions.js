import {createAction, urlToPathKey} from '../../utils/utils'
import plpParser from './parsers/plp'

export const receiveCategory = createAction('Receive Category Data')

export const process = ({payload}) => {
    const {$, $response, url} = payload

    return receiveCategory({
        [urlToPathKey(url)]: plpParser($, $response)
    })
}
