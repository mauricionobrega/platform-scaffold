import {createAction} from '../../utils/utils'
import plpParser from './parsers/plp'
import {SELECTOR} from '../app/constants'

export const receiveData = createAction('Receive PLP Data')

export const process = ({payload}) => {
    const {$, $response, url, currentURL} = payload
    const parsed = plpParser($, $response)
    // Update the store using location.href as key and the result from
    // the parser as our value -- even if it isn't the page we're
    // currently viewing

    const output = {[url]: parsed}
    // Also set the store's current selector to location.href so we
    // can access it in our container, but only if we're on that href
    if (url === currentURL) {
        output[SELECTOR] = url
    }
    return receiveData(output)
}
