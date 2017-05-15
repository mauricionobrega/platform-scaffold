/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {makeJsonEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {SubmissionError} from 'redux-form'
import {createSelector} from 'reselect'
import {createPropsSelector} from 'reselect-immutable-helpers'

import {parseShippingInitialValues, parseLocations, parseShippingMethods, checkoutConfirmationParser} from './parsers'
import {parseCheckoutEntityID, extractMagentoShippingStepData} from '../../../utils/magento-utils'
import {getCookieValue} from '../../../utils/utils'
import {getCart} from '../cart/commands'
import {
    receiveShippingMethods,
    receiveShippingInitialValues,
    receiveCheckoutConfirmationData,
    receiveCheckoutLocations,
    storeBillingAddress,
    receiveHasExistingCard
} from './../../checkout/results'

import {fetchPageData} from '../app/commands'
import {getCustomerEntityID} from '../selectors'
import {getIsLoggedIn} from '../../../store/user/selectors'
import {getFormValues, getFormRegisteredFields} from '../../../store/form/selectors'
import {receiveEntityID} from '../actions'
import {PAYMENT_URL} from '../constants'
import {SHIPPING_FORM_NAME, ADD_NEW_ADDRESS_FIELD} from '../../../containers/checkout-shipping/constants'
import * as paymentSelectors from '../../../store/checkout/payment/selectors'
import * as shippingSelectors from '../../../store/checkout/shipping/selectors'

const getCartBaseUrl = createSelector(
    getCustomerEntityID,
    getIsLoggedIn,
    (entityID, isLoggedIn) => `/rest/default/V1/${isLoggedIn ? 'carts/mine' : `guest-carts/${entityID}`}`
)

const parseLocationData = (formValues, registeredFieldNames) => {
    // Default values to use if none have been selected
    const address = {country_id: 'US', region_id: '0', postcode: null}

    if (formValues) {
        // Only return the field value if the field is registered
        const getRegisteredFieldValue = (fieldName) => {
            return registeredFieldNames.includes(fieldName) ? formValues[fieldName] : undefined
        }

        const countryId = getRegisteredFieldValue('country_id')
        if (countryId) {
            address.country_id = countryId
        }

        const postcode = getRegisteredFieldValue('postcode')
        if (postcode) {
            address.postcode = postcode
        }

        if (formValues.region) {
            address.region = getRegisteredFieldValue('region')
            // Remove the region_id in case we have an old value
            delete address.region_id
        } else {
            address.region_id = getRegisteredFieldValue('region_id')
        }
    }

    return address
}


export const fetchShippingMethodsEstimate = (formKey) => (dispatch, getState) => {
    const currentState = getState()
    const cartBaseUrl = getCartBaseUrl(currentState)
    const formValues = getFormValues(formKey)(currentState)
    const registeredFieldNames = getFormRegisteredFields(formKey)(currentState).map(({name}) => name)
    const address = parseLocationData(formValues, registeredFieldNames)
    const estimateURL = `${cartBaseUrl}/estimate-shipping-methods`
    return makeJsonEncodedRequest(estimateURL, {address}, {method: 'POST'})
        .then((response) => response.json())
        .then((responseJSON) => {
            const shippingMethods = parseShippingMethods(responseJSON)
            const initialValues = {
                shipping_method: shippingMethods[0].value,
                ...address
            }

            dispatch(receiveShippingMethods(shippingMethods))
            dispatch(receiveShippingInitialValues({address: initialValues})) // set initial value for method
        })
}

const processCheckoutData = ($response) => (dispatch) => {
    dispatch(receiveEntityID(parseCheckoutEntityID($response)))
    const magentoFieldData = extractMagentoShippingStepData($response)
          .getIn(['children', 'shipping-address-fieldset', 'children'])

    dispatch(receiveCheckoutLocations(parseLocations(magentoFieldData)))

    return dispatch(receiveShippingInitialValues({
        initialValues: parseShippingInitialValues(magentoFieldData)
    }))
}

export const fetchCheckoutShippingData = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then(([$, $response]) => dispatch(processCheckoutData($response)))  // eslint-disable-line no-unused-vars
        .then(() => dispatch(fetchShippingMethodsEstimate(SHIPPING_FORM_NAME)))
}

export const fetchCheckoutPaymentData = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then((res) => {
            const [$, $response] = res // eslint-disable-line no-unused-vars
            dispatch(receiveHasExistingCard(true))
            return dispatch(processCheckoutData($response))
        })
}

export const fetchCheckoutConfirmationData = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then(([$, $response]) => {
            dispatch(receiveCheckoutConfirmationData(checkoutConfirmationParser($, $response)))
            dispatch(getCart())
        })
}

const addressFormToAddressObject = ({
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
}) => ({
    firstname,
    lastname,
    company: company || '',
    telephone,
    postcode,
    city,
    street: addressLine2 ? [addressLine1, addressLine2] : [addressLine1],
    regionId,
    region,
    countryId,
    saveInAddressBook: true
})

export const submitShipping = (formValues) => (dispatch, getState) => {
    const currentState = getState()
    const cartBaseUrl = getCartBaseUrl(currentState)
    const savedAddress = formValues.saved_address
    const submittingWithNewAddress = savedAddress === ADD_NEW_ADDRESS_FIELD || savedAddress === undefined
    let address

    // Format the shipping address according to whether it's a saved or new address
    if (submittingWithNewAddress) {
        const {name} = formValues
        const names = name.split(' ')

        address = addressFormToAddressObject({
            firstname: names.slice(0, -1).join(' '),
            lastname: names.slice(-1).join(' '),
            ...formValues
        })
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
    const shippingSelections = formValues.shipping_method.split('_')
    const addressInformation = {
        shippingAddress: address,
        billingAddress: {
            ...address,
            saveInAddressBook: false
        },
        shipping_carrier_code: shippingSelections[0],
        shipping_method_code: shippingSelections[1]
    }

    return makeJsonEncodedRequest(`${cartBaseUrl}/shipping-information`, {addressInformation}, {method: 'POST'})
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
            return PAYMENT_URL
        })
}

export const checkCustomerEmail = (customerEmail) => (dispatch) => {
    return makeJsonEncodedRequest('/rest/default/V1/customers/isEmailAvailable', {customerEmail}, {method: 'POST'})
        .then((response) => response.text())
        .then((responseText) => /true/.test(responseText))
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

const paymentSubmissionSelector = createPropsSelector({
    cartBaseUrl: getCartBaseUrl,
    entityID: getCustomerEntityID
})

export const submitPayment = (formValues) => (dispatch, getState) => {

    const {cartBaseUrl, entityID} = paymentSubmissionSelector(getState())
    const address = addressFormToAddressObject(formValues)

    const paymentInformation = {
        billingAddress: {
            ...address,
            saveInAddressBook: false
        },
        cartId: entityID,
        email: formValues.username,
        paymentMethod: {
            additional_data: null,
            method: 'checkmo',
            po_number: null
        }
    }

    // Save payment address for confirmation
    dispatch(storeBillingAddress(address))
    return makeJsonEncodedRequest(`${cartBaseUrl}/payment-information`, paymentInformation, {method: 'POST'})
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

const updateBillingAddress = () => (dispatch, getState) => {
    const formData = buildFormData({
        form_key: getCookieValue('form_key'),
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
        .catch((response) => {
            console.error('Updating the user Shipping/Billing address failed. Response log:')
            console.error(response)
            throw new Error('Unable to save Billing Address')
        })
}

export const updatingShippingAndBilling = () => (dispatch, getState) => {
    const shippingData = shippingSelectors.getShippingAddress(getState()).toJS()
    const formData = buildFormData({
        form_key: getCookieValue('form_key'),
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
            return null
        })
        .catch((response) => {
            console.error('Updating the user Shipping and Billing address failed. Response log:')
            console.error(response)
            throw new Error('Unable to save Shipping and Billing Address')
        })
}
