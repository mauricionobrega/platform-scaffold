import {createAction} from '../../utils/utils'
import checkoutShippingParser from './parsers/checkout-shipping'
import shippingMethodParser from './parsers/shipping-method'
import {addNotification} from '../app/actions'

import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'

export const showCompanyAndApt = createAction('Showing the "Company" and "Apt #" fields')

export const receiveData = createAction('Receive Checkout Shipping Data')
export const process = ({payload: {$, $response}}) => {
    return receiveData(checkoutShippingParser($, $response))
}

export const onShippingEmailRecognized = () => {
    return (dispatch) => {
        dispatch(addNotification({
            content: `Welcome back! Sign in for a faster checkout or continue as a guest.`,
            id: 'shippingWelcomeBackMessage',
            showRemoveButton: true
        }))
    }
}

export const fetchShippingMethods = (entityID) => {
    return (dispatch) => {
        const requestData = {
            body: '{"address":{"country_id":"US","region_id":"0","postcode":null}}',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const isLoggedIn = false
        const getEstimateURL = `https://www.merlinspotions.com/rest/default/V1/${isLoggedIn ? 'carts/mine' : `guest-carts/${entityID}`}/estimate-shipping-methods`
        makeRequest(getEstimateURL, requestData)
            .then((response) => response.json())
            .then((responseJSON) => {
                dispatch(receiveData({shippingMethods: shippingMethodParser(responseJSON)}))
            })

    }




}
