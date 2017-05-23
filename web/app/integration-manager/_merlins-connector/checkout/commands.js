/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {makeJsonEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {SubmissionError} from 'redux-form'

import {parseShippingInitialValues, parseLocations, parseShippingMethods, checkoutConfirmationParser} from './parsers'
import {parseCartTotals} from '../cart/parser'
import {parseCheckoutEntityID, extractMagentoShippingStepData} from '../../../utils/magento-utils'
import {getCookieValue, parseLocationData} from '../../../utils/utils'
import {getCart} from '../cart/commands'
import {receiveCheckoutData, receiveShippingInitialValues, receiveCheckoutConfirmationData, receiveHasExistingCard} from './../../checkout/results'
import {receiveCartContents} from './../../cart/results'
import {fetchPageData} from '../app/commands'
import {getCustomerEntityID} from '../selectors'
import {receiveEntityID} from '../actions'
import {PAYMENT_URL} from '../constants'
import {ADD_NEW_ADDRESS_FIELD} from '../../../containers/checkout-shipping/constants'
import {getFormValues, getFormRegisteredFields} from '../../../store/form/selectors'
import {getIsLoggedIn} from '../../../store/user/selectors'
import {SHIPPING_FORM_NAME} from '../../../store/form/constants'
import * as paymentSelectors from '../../../store/checkout/payment/selectors'
import * as shippingSelectors from '../../../store/checkout/shipping/selectors'

export const fetchShippingMethodsEstimate = (formKey) => (dispatch, getState) => {
    const currentState = getState()
    const isLoggedIn = getIsLoggedIn(currentState)
    const formValues = getFormValues(formKey)(currentState)
    const entityID = getCustomerEntityID(currentState)
    const registeredFieldNames = getFormRegisteredFields(formKey)(currentState).map(({name}) => name)

    // @TODO: We should probably pull this data from the STATE instead of form
    //        fields since there might not be fields, i.e. w/ Saved Addresses
    const address = parseLocationData(formValues, registeredFieldNames)

    const estimateURL = `/rest/default/V1/${isLoggedIn ? 'carts/mine' : `guest-carts/${entityID}`}/estimate-shipping-methods`
    return makeJsonEncodedRequest(estimateURL, {address}, {method: 'POST'})
        .then((response) => response.json())
        .then((responseJSON) => {
            const shippingMethods = parseShippingMethods(responseJSON)
            const initialValues = {
                shipping_method: shippingMethods[0].value,
                ...address
            }

            dispatch(receiveCheckoutData({shipping: {shippingMethods}}))
            dispatch(receiveShippingInitialValues({address: initialValues})) // set initial value for method
        })
}

const processCheckoutData = ($response) => (dispatch) => {
    dispatch(receiveEntityID(parseCheckoutEntityID($response)))
    const magentoFieldData = extractMagentoShippingStepData($response)
          .getIn(['children', 'shipping-address-fieldset', 'children'])

    return dispatch(receiveCheckoutData({
        locations: parseLocations(magentoFieldData).locations,
        shipping: {
            initialValues: parseShippingInitialValues(magentoFieldData)
        }
    }))
}

export const initCheckoutShippingPage = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then(([$, $response]) => dispatch(processCheckoutData($response)))  // eslint-disable-line no-unused-vars
        .then(() => dispatch(fetchShippingMethodsEstimate(SHIPPING_FORM_NAME)))
}

export const initCheckoutConfirmationPage = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then(([$, $response]) => {
            dispatch(receiveCheckoutConfirmationData(checkoutConfirmationParser($, $response)))
            dispatch(getCart())
        })
}

export const submitShipping = (formValues) => (dispatch, getState) => {
    const currentState = getState()
    const savedAddress = formValues.saved_address
    const submittingWithNewAddress = savedAddress === ADD_NEW_ADDRESS_FIELD || savedAddress === undefined
    let address

    // Format the shipping address according to whether it's a saved or new address
    if (submittingWithNewAddress) {
        const {name} = formValues
        const names = name.split(' ')
        const newAddress = formValues

        address = {
            firstname: names.slice(0, -1).join(' '),
            lastname: names.slice(-1).join(' '),
            company: newAddress.company || '',
            telephone: newAddress.telephone,
            postcode: newAddress.postcode,
            city: newAddress.city,
            street: newAddress.addressLine2
                ? [newAddress.addressLine1, newAddress.addressLine2]
                : [newAddress.addressLine1],
            regionId: newAddress.regionId,
            region: newAddress.region,
            countryId: newAddress.countryId,
            saveInAddressBook: true
        }
    } else {
        const {saved_address} = formValues
        const savedAddress = shippingSelectors.getSavedAddresses(currentState).toJS()
            .filter(({customerAddressId}) => {
                return parseInt(customerAddressId) === parseInt(saved_address)
            })[0] || {}

        address = {
            ...savedAddress,
            region: savedAddress.region,
            saveInAddressBook: false
        }

        delete address.default_billing
        delete address.default_shipping
    }

    // Prepare and then run Shipping Information request
    const {shipping_method} = formValues
    const shippingSelections = shipping_method.split('_')
    const addressData = {
        addressInformation: {
            shippingAddress: address,
            billingAddress: {
                ...address,
                saveInAddressBook: false
            },
            shipping_carrier_code: shippingSelections[0],
            shipping_method_code: shippingSelections[1]
        }
    }
    const entityID = getCustomerEntityID(currentState)
    const isLoggedIn = getIsLoggedIn(currentState)
    const persistShippingURL = `/rest/default/V1/${isLoggedIn ? 'carts/mine' : `guest-carts/${entityID}`}/shipping-information`
    return makeJsonEncodedRequest(persistShippingURL, addressData, {method: 'POST'})
        .then((response) => {
            if (response.status === 400) {
                throw Error(`Error submitting shipping information: ${response.statusText}`)
            }
            return response.json()
        })
        .then((responseJSON) => {
            if (!responseJSON.payment_methods) {
                throw new SubmissionError({_error: 'Unable to save shipping address'})
            }

            dispatch(receiveCartContents(parseCartTotals(responseJSON.totals)))
            return PAYMENT_URL
        })
}

export const isEmailAvailable = (email) => (dispatch) => {
    return makeJsonEncodedRequest(
            '/rest/default/V1/customers/isEmailAvailable',
            {customerEmail: email},
            {method: 'POST'}
        )
        .then((response) => response.text())
        .then((responseText) => {
            return /true/.test(responseText)
        })
}

export const initCheckoutPaymentPage = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then((res) => {
            const [$, $response] = res // eslint-disable-line no-unused-vars
            dispatch(receiveHasExistingCard(true))
            return dispatch(processCheckoutData($response))
        })
}

export const submitPayment = (formValues) => (dispatch, getState) => {
    const currentState = getState()
    const entityID = getCustomerEntityID(currentState)
    const isLoggedIn = getIsLoggedIn(currentState)

    const address = {
        firstname: formValues.firstname,
        lastname: formValues.lastname,
        company: formValues.company || '',
        postcode: formValues.postcode,
        city: formValues.city,
        street: formValues.street,
        regionId: formValues.regionId,
        countryId: formValues.countryId,
        saveInAddressBook: false
    }

    const paymentInformation = {
        billingAddress: {
            ...address
        },
        cartId: entityID,
        email: formValues.username,
        paymentMethod: {
            additional_data: null,
            method: 'checkmo',
            po_number: null
        }
    }

    const persistPaymentURL = `/rest/default/V1/${isLoggedIn ? 'carts/mine' : `guest-carts/${entityID}`}/payment-information`
    // Save payment address for confirmation
    dispatch(receiveCheckoutData({payment: {address}}))
    return makeJsonEncodedRequest(persistPaymentURL, paymentInformation, {method: 'POST'})
        .then((response) => response.json())
        .then((responseJSON) => {
            // Looks like when it is successful, the responseJSON is a number
            if (/^\d+$/.test(responseJSON)) {
                return '/checkout/onepage/success/'
            } else {
                throw new Error(responseJSON.message)
            }
        })
}

const buildFormData = (formCredentials) => {
    const formData = new FormData()

    Object.keys(formCredentials).forEach((key) => {
        const item = formCredentials[key]
        if (key === 'street') {
            // Street must be converted away from an array, and into a
            // series of `street[]` keys-value pairs. This is what the
            // Magento backend uses to fill out multiple street
            // address fields
            for (let i = 0; i < item.length; i++) {
                formData.append('street[]', item[i])
            }
        } else {
            formData.append(key, item)
        }
    })

    formData.append('form_key', getCookieValue('form_key'))

    return formData
}

const createAddressRequestObject = (formValues) => {
    const {
        firstname,
        lastname,
        company,
        addressLine1,
        addressLine2,
        countryId,
        city,
        regionId,
        region,
        postcode,
        telephone
    } = formValues

    return {
        firstname,
        lastname,
        company: company || '',
        telephone: telephone ? telephone.replace(/[()\- ]/g, '') : '',
        postcode,
        city,
        street: addressLine2 ? [addressLine1, addressLine2] : [addressLine1, ''],
        region_id: regionId,
        region: region || '',
        country_id: countryId,
    }
}

// Some of the endpoints don't work with fetch, getting a 400 error
// from the backend. This function wraps the jQuery ajax() function
// to make requests to these endpoints.
//
// It looks like the server may be looking for the header
// X-Requested-With: XMLHttpRequest, which is not present with fetch.
//
// Alternatively, we could have an issue with header case:
// http://stackoverflow.com/questions/34656412/fetch-sends-lower-case-header-keys
const jqueryAjaxWrapper = (options) => {
    return new Promise((resolve, reject) => {
        window.Progressive.$.ajax({
            ...options,
            success: (responseData) => resolve(responseData),
            error: (xhr, status) => reject(status)
        })
    })
}

const updateBillingAddress = () => (dispatch, getState) => {
    const formData = buildFormData({
        success_url: '',
        error_url: '',
        ...createAddressRequestObject(paymentSelectors.getPayment(getState())),
        default_billing: 1,
        default_shipping: 1,
    })

    const postUpdateCustomerAddressURL = '/customer/address/formPost/id/46/'
    return jqueryAjaxWrapper({
        url: postUpdateCustomerAddressURL,
        data: formData,
        method: 'POST',
        processData: false,
        contentType: false
    })
        .catch((error) => {
            console.error('Updating the user Shipping/Billing address failed. Response log:')
            console.error(error)
            throw new Error('Unable to save Billing Address')
        })
}


export const updateShippingAndBilling = () => (dispatch, getState) => {
    const shippingData = shippingSelectors.getShippingAddress(getState()).toJS()
    const formData = buildFormData({
        success_url: '',
        error_url: '',
        ...createAddressRequestObject(shippingData),
        default_billing: 1,
        default_shipping: 1,
    })

    const postUpdateCustomerAddressURL = '/customer/address/formPost/'

    return jqueryAjaxWrapper({
        url: postUpdateCustomerAddressURL,
        data: formData,
        method: 'POST',
        processData: false,
        contentType: false,
    })
        .then(() => {
            const paymentData = paymentSelectors.getPayment(getState())
            const shippingIsDifferentThanBilling = JSON.stringify(shippingData) !== JSON.stringify(paymentData)
            if (shippingIsDifferentThanBilling) {
                return dispatch(updateBillingAddress())
            }
            return Promise.resolve()
        })
        .catch((error) => {
            console.error('Updating the user Shipping and Billing address failed. Response log:')
            console.error(error)
            throw new Error('Unable to save Shipping and Billing Address')
        })
}
