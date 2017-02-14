import {createAction, makeRequest} from '../../utils/utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import checkoutPaymentParser from './checkout-payment-parser'

import {getShippingFormValues} from '../../store/form/selectors'
import {getCustomerEntityID} from './selectors'
import {getIsLoggedIn} from '../app/selectors'

export const receiveContents = createAction('Received CheckoutPayment Contents')
export const toggleFixedPlaceOrder = createAction('Toggled the fixed "Place Order" container', 'isFixedPlaceOrderShown')
export const toggleCardInputRadio = createAction('Toggled the card method radio input', 'isNewCardInputSelected')
export const toggleCompanyAptField = createAction('Showing the "Company" and "Apt #" fields', 'isCompanyOrAptShown')
export const toggleNewAddressFields = createAction('Toggled new address fields', 'newShippingAddressIsEnabled')

export const receiveResponse = (response) => {
    return (dispatch) => {
        return jqueryResponse(response)
            .then(([$, $responseText]) => {
                dispatch(receiveContents(checkoutPaymentParser($, $responseText)))
            })
    }
}

export const fetchContents = () => {
    return (dispatch) => {
        return makeRequest(window.location.href)
            .then((response) => dispatch(receiveResponse(response)))
    }
}

export const submitPayment = () => {
    return (dispatch, getState) => {
        const currentState = getState()
        const {
            name,
            company,
            addressLine1,
            addressLine2,
            country_id,
            city,
            region_id,
            postcode,
            telephone,
            shipping_method
        } = getShippingFormValues(currentState)
        const entityID = getCustomerEntityID(currentState)
        const isLoggedIn = getIsLoggedIn(currentState)
        const names = name.split(' ')
        const shippingSelections = shipping_method.split('_')
        const addressData = {
            firstname: names.slice(0, -1).join(' '),
            lastname: names.slice(-1).join(' '),
            company: company || '',
            telephone,
            postcode,
            city,
            street: addressLine2 ? [addressLine1, addressLine2] : [addressLine1],
            regionId: region_id,
            countryId: country_id,
            save_in_address_book: true
        }
        const addressInformation = {
            addressInformation: {
                shippingAddress: addressData,
                billingAddress: {
                    ...addressData,
                    saveInAddressBook: false
                },
                shipping_carrier_code: shippingSelections[0],
                shipping_method_code: shippingSelections[1]
            }
        }
        const persistShippingURL = `https://www.merlinspotions.com/rest/default/V1/${isLoggedIn ? 'carts/mine' : `guest-carts/${entityID}`}/shipping-information`
        makeJsonEncodedRequest(persistShippingURL, addressInformation, {method: 'POST'})
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON.payment_methods) {
                    // TO DO: send response data to the next container
                    browserHistory.push({
                        pathname: '/checkout/confirmation/'
                    })
                }
            })
    }
}
