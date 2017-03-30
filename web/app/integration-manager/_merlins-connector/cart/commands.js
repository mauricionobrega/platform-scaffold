import {makeRequest, makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {removeNotification} from '../../../containers/app/actions'
import {receiveCartContents} from '../../cart/responses'
import {receiveCheckoutData} from '../../checkout/responses'
import {getFormKey} from '../selectors'
import parseCart from './parser'
import {parseLocations} from '../checkout/parsers'
import {fetchPageData} from '../app/commands'
import {parseCheckoutEntityID, extractMagentoJson} from '../../../utils/magento-utils'

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
const ESTIMATE_FIELD_PATH = ['#block-summary', 'Magento_Ui/js/core/app', 'components', 'block-summary', 'children', 'block-shipping', 'children', 'address-fieldsets', 'children']

export const fetchCartPageData = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then((res) => {
            const [$, $response] = res
            const customerEntityID = parseCheckoutEntityID($response)
            const magentoFieldData = extractMagentoJson($response).getIn(ESTIMATE_FIELD_PATH)
            const locationsData = parseLocations(magentoFieldData)

            dispatch(receiveCheckoutData({
                customerEntityID,
                ...locationsData
            }))
        })
        .then(() => {
            console.log('FETCH SHIPPING ESTIMATE DATA')
        })
}
