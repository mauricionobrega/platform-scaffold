import {createAction} from '../../utils/utils'
import {getCheckoutEntityID, extractMagentoJson} from '../../utils/magento-utils'

import parseLocations from './locations/parser'

export const receiveCheckoutData = createAction('Receive Checkout Data')

export const receiveShippingMethodInitialValues = createAction('Receive Shipping Method Initial Values', 'shipping')

const ESTIMATE_FIELD_PATH = ['#block-summary', 'Magento_Ui/js/core/app', 'components', 'block-summary', 'children', 'block-shipping', 'children', 'address-fieldsets', 'children']

export const processCartCheckoutData = ({payload: {$response}}) => {
    return (dispatch) => {
        const customerEntityID = getCheckoutEntityID($response)
        const magentoFieldData = extractMagentoJson($response).getIn(ESTIMATE_FIELD_PATH)
        const locationsData = parseLocations(magentoFieldData)

        dispatch(receiveCheckoutData({
            customerEntityID,
            ...locationsData
        }))

    }
}
