/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {SubmissionError} from 'redux-form'
import {createBasket} from '../cart/utils'
import {makeSfccRequest} from '../utils'
import {API_END_POINT_URL} from '../constants'
import {STATES} from './constants'
import {receiveShippingMethods, receiveShippingMethodInitialValues, receiveCheckoutLocations} from './../../checkout/results'

const basketUrl = (basketID) => `${API_END_POINT_URL}/baskets/${basketID}`

export const fetchShippingMethodsEstimate = () => (dispatch) => {
    return createBasket()
        .then((basketID) => makeSfccRequest(`${basketUrl(basketID)}/shipments/me/shipping_methods`, {method: 'GET'}))
        .then((response) => response.json())
        .then(({applicable_shipping_methods}) => dispatch(receiveShippingMethods(
            applicable_shipping_methods.map(({name, description, price, id}) => ({
                label: `${name} - ${description}`,
                cost: `$${price.toFixed(2)}`,
                id
            }))
        )))
}

export const fetchCheckoutShippingData = () => (dispatch) => {
    return createBasket()
        .then((basketID) => makeSfccRequest(basketUrl(basketID), {method: 'GET'}))
        .then((response) => response.json())
        .then((responseJSON) => {
            const {
                customer_info: {
                    email
                },
                shipments: [{
                    shipping_address,
                    shipping_method
                }]
            } = responseJSON
            let initialValues
            /* eslint-disable camelcase */
            if (shipping_address) {
                initialValues = {
                    username: email,
                    name: shipping_address.full_name,
                    company: shipping_address.company_name,
                    addressLine1: shipping_address.address1,
                    addressLine2: shipping_address.address2,
                    countryId: shipping_address.country_code,
                    city: shipping_address.city,
                    regionId: shipping_address.state_code,
                    postcode: shipping_address.postal_code,
                    telephone: shipping_address.phone,
                    shipping_method: shipping_method ? shipping_method.id : undefined
                }
            } else {
                initialValues = {
                    countryId: 'us'
                }
            }
            /* eslint-enable camelcase */
            dispatch(receiveShippingMethodInitialValues({initialValues}))
            dispatch(receiveCheckoutLocations({
                countries: [
                    {id: 'us', label: 'United States', regionRequired: true, postcodeRequired: true}
                ],
                regions: STATES
            }))
        })
        .then(() => dispatch(fetchShippingMethodsEstimate()))
}

export const submitShipping = (formValues) => (dispatch) => {
    const {
        name,
        firstname,
        lastname,
        username,
        company,
        addressLine1,
        addressLine2,
        countryId,
        city,
        regionId,
        postcode,
        telephone,
        shipping_method
    } = formValues
    return createBasket()
        .then((basketID) => {
            const requestOptions = {
                method: 'PUT',
                body: JSON.stringify({
                    email: username,
                    customer_name: name
                })
            }
            return makeSfccRequest(`${basketUrl(basketID)}/customer`, requestOptions)
                .then(() => basketID)
        })
        .then((basketID) => {
            const requestOptions = {
                method: 'PATCH',
                body: JSON.stringify({
                    shipping_address: {
                        address1: addressLine1,
                        address2: addressLine2,
                        city,
                        country_code: countryId,
                        first_name: firstname,
                        last_name: lastname,
                        full_name: name,
                        phone: telephone,
                        postal_code: postcode,
                        state_code: regionId,
                        company_name: company
                    },
                    shipping_method: {
                        id: shipping_method
                    }
                })
            }
            return makeSfccRequest(`${basketUrl(basketID)}/shipments/me`, requestOptions)
                .then((response) => response.json())
                .then((responseJSON) => {
                    if (responseJSON.fault) {
                        throw new SubmissionError({_error: 'Unable to save shipping data'})
                    }
                })
        })
}

// We're not currently checking the customer's email on the sfcc site
// Return true to prevent the welcome banner from showing
export const checkCustomerEmail = () => () => Promise.resolve(true)
