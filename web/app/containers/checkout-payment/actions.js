import {browserHistory} from 'react-router'
import {createAction, makeRequest} from '../../utils/utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import checkoutPaymentParser from './checkout-payment-parser'

import {makeJsonEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'

import {getPaymentBillingFormValues} from '../../store/form/selectors'
import {getCustomerEntityID} from './selectors'
import {getIsLoggedIn} from '../app/selectors'

export const receiveContents = createAction('Received CheckoutPayment Contents')
export const toggleFixedPlaceOrder = createAction('Toggled the fixed "Place Order" container', 'isFixedPlaceOrderShown')
export const toggleCardInputRadio = createAction('Toggled the card method radio input', 'isNewCardInputSelected')
export const toggleCompanyAptField = createAction('Showing the "Company" and "Apt #" fields', 'isCompanyOrAptShown')
export const toggleNewAddressFields = createAction('Toggled new address fields', 'newShippingAddressIsEnabled')
export const setCvvType = createAction('Setting CVV type', 'cvvType')

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
        } = getPaymentBillingFormValues(currentState)
        const entityID = getCustomerEntityID(currentState)
        const isLoggedIn = getIsLoggedIn(currentState)
        const names = name.split(' ')
        const addressData = {
            firstname: names.slice(0, -1).join(' '),
            lastname: names.slice(-1).join(' '),
            company: company || '',
            postcode,
            city,
            street: addressLine2 ? [addressLine1, addressLine2] : [addressLine1],
            regionId: region_id,
            countryId: country_id,
            saveInAddressBook: false
        }
        const paymentInformation = {
            billingAddress: {
                ...addressData
            },
            cartId: entityID,
            // TODO: Use selector to get email data
            email: 'mobifyqa@gmail.com',
            paymentMethod: {
                additional_data: null,
                method: 'checkmo',
                po_number: null
            }
        }
        const persistPaymentURL = `https://www.merlinspotions.com/rest/default/V1/${isLoggedIn ? 'carts/mine' : `guest-carts/${entityID}`}/payment-information`
        makeJsonEncodedRequest(persistPaymentURL, paymentInformation, {method: 'POST'})
            .then((response) => response.json())
            .then(
                browserHistory.push({
                    pathname: '/checkout/confirmation/'
                })
            )
    }
}
