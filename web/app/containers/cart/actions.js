import {closeModal} from '../../store/modals/actions'
import {fetchShippingMethodsEstimate} from '../../store/checkout/shipping/actions'
import {CART_ESTIMATE_SHIPPING_MODAL, ESTIMATE_FORM_NAME} from './constants'

export const submitEstimateShipping = () => {
    return (dispatch) => {
        dispatch(fetchShippingMethodsEstimate(ESTIMATE_FORM_NAME))
        dispatch(closeModal(CART_ESTIMATE_SHIPPING_MODAL))
    }
}
