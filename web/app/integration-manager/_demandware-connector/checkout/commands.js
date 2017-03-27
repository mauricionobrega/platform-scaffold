import {getBasketID} from '../cart/commands'
import {makeDemandwareRequest} from '../utils'
import {API_END_POINT_URL} from '../constants'
import {receiveCheckoutData, receiveShippingMethodInitialValues} from './../../checkout/responses'


import {noop} from 'progressive-web-sdk/dist/utils/utils'

export const fetchShippingMethodsEstimate = () => (dispatch) => {
    return getBasketID()
        .then((basketID) => {
            makeDemandwareRequest(`${API_END_POINT_URL}/baskets/${basketID}/shipments/me/shipping_methods`, {method: 'GET'})
            .then((response) => response.json())
            .then((responseJSON) => {
                const initialValues = {
                    shipping_method: responseJSON.default_shipping_method_id
                }
                const shippingMethods = responseJSON.applicable_shipping_methods.map((shippingMethod) => {
                    return {
                        label: `${shippingMethod.name} - ${shippingMethod.description}`,
                        cost: `$${shippingMethod.price.toFixed(2)}`,
                        value: shippingMethod.id
                    }
                })

                dispatch(receiveCheckoutData({shipping: {shippingMethods}}))
                return dispatch(receiveShippingMethodInitialValues({initialValues}))
            })
        })
}

export const fetchCheckoutShippingData = () => (dispatch) => {
    return dispatch(fetchShippingMethodsEstimate())
}

export const submitShipping = noop

export const checkCustomerEmail = noop

export const checkoutSignIn = noop
