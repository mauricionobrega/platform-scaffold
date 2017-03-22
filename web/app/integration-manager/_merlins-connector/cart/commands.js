import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {removeNotification} from '../../../containers/app/actions'
import {receiveCartContents} from '../../cart/responses'
import parseCart from './parser'

const LOAD_CART_SECTION_URL = '/customer/section/load/?sections=cart%2Cmessages&update_section_id=true'
const BASE_HEADERS = {
    Accept: 'application/json',
}
/**
 * Get the contents of the users cart
 */
export const getCart = () => (dispatch) => {
    const opts = {
        headers: BASE_HEADERS
    }
    dispatch(removeNotification('cartUpdateError'))
    const currentTimeMs = new Date().getTime()
    return makeRequest(`${LOAD_CART_SECTION_URL}&_=${currentTimeMs}`, opts)
        .then((response) => response.text())
        .then((responseText) => dispatch(receiveCartContents(parseCart(responseText))))
}
