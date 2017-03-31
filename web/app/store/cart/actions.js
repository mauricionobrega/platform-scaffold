/**
 * Demonstrates fetching/modifying the cart contents on the Merlin's site. This isn't
 * tested - just the result of inspecting the requests/responses to the site and then
 * translating them to JS.
 *
 * All requests require a session, eg. 'Cookie: PHPSESSID=as337c3fq7751n9gn1o3enacf7'
 */
import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import parse from './parsers/parser'

import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {removeNotification} from '../../containers/app/actions'

const LOAD_CART_SECTION_URL = '/customer/section/load/?sections=cart%2Cmessages&update_section_id=true'
const baseHeaders = {
    Accept: 'application/json',
}

export const receiveCartContents = createAction('Received Cart Contents')

/**
 * Get the contents of the users cart
 * This function is a dupe of the one in the merlin's connector
 * Remove this function once the cart section has been fully converted to the merlin's connector
 */
export const getCart = () => (dispatch) => {
    const opts = {
        headers: baseHeaders
    }
    dispatch(removeNotification('cartUpdateError'))
    const currentTimeMs = new Date().getTime()
    return makeRequest(`${LOAD_CART_SECTION_URL}&_=${currentTimeMs}`, opts)
        .then((response) => response.text())
        .then((responseText) => dispatch(receiveCartContents(parse(responseText))))
}
