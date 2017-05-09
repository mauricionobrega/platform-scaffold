import {makeJsonEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {SubmissionError} from 'redux-form'

import {parseShippingInitialValues, parseLocations, parseShippingMethods, checkoutConfirmationParser} from './parsers'
import {parseCheckoutEntityID, extractMagentoShippingStepData} from '../../../utils/magento-utils'
import {getCookieValue} from '../../../utils/utils'
import {submitForm} from '../utils'
import {getCart} from '../cart/commands'
import {receiveCheckoutData, receiveShippingMethodInitialValues, receiveCheckoutConfirmationData, receiveHasExistingCard} from './../../checkout/results'

import {fetchPageData} from '../app/commands'
import {getCustomerEntityID} from '../selectors'
import {getIsLoggedIn} from '../../../containers/app/selectors'
import {getShippingFormValues, getFormValues, getFormRegisteredFields} from '../../../store/form/selectors'
import {receiveEntityID} from '../actions'
import {PAYMENT_URL, CREATE_ACCOUNT_POST_URL} from '../constants'
import {removeAllNotifications} from '../../../containers/app/actions'
import {SHIPPING_FORM_NAME} from '../../../containers/checkout-shipping/constants'
import * as paymentSelectors from '../../../store/checkout/payment/selectors'
import * as shippingSelectors from '../../../store/checkout/shipping/selectors'

export const fetchShippingMethodsEstimate = (formKey) => (dispatch, getState) => {
    const currentState = getState()
    const isLoggedIn = getIsLoggedIn(currentState)
    const formValues = getFormValues(formKey)(currentState)
    const entityID = getCustomerEntityID(currentState)
    const registeredFieldNames = getFormRegisteredFields(formKey)(currentState).map(({name}) => name)
    // Default values to use if none have been selected
    const address = {country_id: 'US', region_id: '0', postcode: null}

    if (formValues) {
        // Only return the field value if the field is registered
        const getRegisteredFieldValue = (fieldName) => {
            return registeredFieldNames.includes(fieldName) ? formValues[fieldName] : undefined
        }
        address.country_id = getRegisteredFieldValue('countryId')
        address.region_id = getRegisteredFieldValue('regionId')
        address.postcode = getRegisteredFieldValue('postcode')
        if (formValues.region) {
            address.region = getRegisteredFieldValue('region')
            // Remove the region_id in case we have an old value
            delete address.region_id
        }
    }
    const estimateURL = `/rest/default/V1/${isLoggedIn ? 'carts/mine' : `guest-carts/${entityID}`}/estimate-shipping-methods`
    return makeJsonEncodedRequest(estimateURL, {address}, {method: 'POST'})
        .then((response) => response.json())
        .then((responseJSON) => {
            const shippingMethods = parseShippingMethods(responseJSON)
            const initialValues = {
                shipping_method: shippingMethods[0].value
            }
            dispatch(receiveCheckoutData({shipping: {shippingMethods}}))
            dispatch(receiveShippingMethodInitialValues({initialValues})) // set initial value for method
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

export const fetchCheckoutShippingData = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then(([$, $response]) => dispatch(processCheckoutData($response)))  // eslint-disable-line no-unused-vars
        .then(() => dispatch(fetchShippingMethodsEstimate(SHIPPING_FORM_NAME)))
        .catch((error) => { console.info(error.message) })
}

export const fetchCheckoutConfirmationData = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then(([$, $response]) => {
            dispatch(receiveCheckoutConfirmationData(checkoutConfirmationParser($, $response)))
            dispatch(getCart())
        })
}

export const submitShipping = (formValues) => {
    return (dispatch, getState) => {
        const currentState = getState()
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
            telephone,
            shipping_method
        } = formValues
        const entityID = getCustomerEntityID(currentState)
        const isLoggedIn = getIsLoggedIn(currentState)
        const shippingSelections = shipping_method.split('_')
        const address = {
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
            save_in_address_book: true
        }
        const addressInformation = {
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
        const persistShippingURL = `/rest/default/V1/${isLoggedIn ? 'carts/mine' : `guest-carts/${entityID}`}/shipping-information`
        return makeJsonEncodedRequest(persistShippingURL, addressInformation, {method: 'POST'})
            .then((response) => response.json())
            .then((responseJSON) => {
                if (!responseJSON.payment_methods) {
                    throw new SubmissionError({_error: 'Unable to save shipping address'})
                }
                return PAYMENT_URL
            })
    }
}

export const checkCustomerEmail = () => {
    return (dispatch, getState) => {
        const formValues = getShippingFormValues(getState())

        return makeJsonEncodedRequest('/rest/default/V1/customers/isEmailAvailable', {customerEmail: formValues.username}, {method: 'POST'})
            .then((response) => response.text())
            .then((responseText) => {
                return /true/.test(responseText)
            })
    }
}

export const checkoutSignIn = (formValues) => {
    return (dispatch) => {
        const {
            username,
            password
        } = formValues

        // This data has to be sent via AJAX, it doesn't work with makeJsonEncodedRequest
        // If we send this using makeRequest, fetch or makeJsonEncodedRequest we get back a 400 (bad request) error
        // After comparing our request (using makeRequest, fetch or makeJsonEncodedRequest) to the desktop request (using AJAX)
        // The only difference we could find is that the desktop request is sent via AJAX and therefor includes the header X-Requested-With: XMLHttpRequest
        return new Promise((resolve, reject) => {
            window.Progressive.$.ajax({
                url: '/customer/ajax/login',
                data: JSON.stringify({username, password, context: 'checkout'}),
                method: 'POST',
                success: (responseData) => {
                    dispatch(removeAllNotifications())
                    if (responseData.errors) {
                        return reject(Error(responseData.message))
                    } else {
                        // Refetch the page now that the user is logged in
                        return resolve(dispatch(fetchCheckoutShippingData(window.location.href)))
                    }
                }
            })
        })
    }
}

export const checkoutRegister = (userCredentials) => {
    return submitForm(CREATE_ACCOUNT_POST_URL, userCredentials, {method: 'POST'})
        .then((response) => {
            const responseUrlHas = (chunk) => response.url.search(chunk) >= 0
            const redirectUrlIsNotToCreate = responseUrlHas('/account/') && !responseUrlHas('/create/')

            if (!redirectUrlIsNotToCreate) {
                throw new SubmissionError('Could not complete registration. The email you provided may already be in use.')
            }

            return Promise.resolve()
        })
}

export const fetchCheckoutPaymentData = (url) => (dispatch) => {
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
    const {
        firstname,
        lastname,
        company,
        addressLine1,
        addressLine2,
        countryId,
        city,
        regionId,
        postcode,
        username
    } = formValues
    const address = {
        firstname,
        lastname,
        company: company || '',
        postcode,
        city,
        street: addressLine2 ? [addressLine1, addressLine2] : [addressLine1],
        regionId,
        countryId,
        saveInAddressBook: false
    }
    const paymentInformation = {
        billingAddress: {
            ...address
        },
        cartId: entityID,
        email: username,
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

const updateBillingAddress = () => {
    return (dispatch, getState) => {
        const formData = buildFormData({
            form_key: getCookieValue('form_key'),
            success_url: '',
            error_url: '',
            ...createAddressRequestObject(paymentSelectors.getPayment(getState())),
            default_billing: 1,
            default_shipping: 1,
        })

        const postUpdateCustomerAddressURL = '/customer/address/formPost/id/46/'
        return new Promise((resolve) => {
            // We need to use jQuery.ajax here because currently fetch sends requests with all headers set to lowercase
            // using fetch here means the server won't handle our request properly
            // so instead we're using jQuery ajax since it sends requests matching what the server expects.
            // see http://stackoverflow.com/questions/34656412/fetch-sends-lower-case-header-keys
            window.Progressive.$.ajax({
                url: postUpdateCustomerAddressURL,
                data: formData,
                method: 'POST',
                processData: false,
                contentType: false,
                success: () => resolve(),
                error: (response) => {
                    console.error('Updating the user Shipping/Billing address failed. Response log:')
                    console.error(response)
                    throw new Error('Unable to save Billing Address')
                }
            })
        })
    }
}

export const updatingShippingAndBilling = () => {
    return (dispatch, getState) => {
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

        return new Promise((resolve) => {
            // We need to use jQuery.ajax here because currently fetch sends requests with all headers set to lowercase
            // using fetch here means the server won't handle our request properly
            // so instead we're using jQuery ajax since it sends requests matching what the server expects.
            // see http://stackoverflow.com/questions/34656412/fetch-sends-lower-case-header-keys
            window.Progressive.$.ajax({
                url: postUpdateCustomerAddressURL,
                data: formData,
                method: 'POST',
                processData: false,
                contentType: false,
                success: () => {
                    const paymentData = paymentSelectors.getPayment(getState())
                    const shippingIsDifferentThanBilling = JSON.stringify(shippingData) !== JSON.stringify(paymentData)
                    if (shippingIsDifferentThanBilling) {
                        return dispatch(updateBillingAddress())
                    }
                    return resolve()
                },
                error: (response) => {
                    console.error('Updating the user Shipping and Billing address failed. Response log:')
                    console.error(response)
                    throw new Error('Unable to save Shipping and Billing Address')
                }
            })
        })
    }
}
