import {browserHistory} from 'progressive-web-sdk/dist/routing'
import {makeJsonEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {checkoutShippingParser, parseCheckoutData, parseShippingMethods} from './parsers'
import {parseCheckoutEntityID} from '../../../utils/magento-utils'
import {receiveCheckoutShippingData, receiveCheckoutData, receiveShippingMethodInitialValues} from './../../checkout/responses'
import {fetchPageData} from '../app/commands'
import {getCustomerEntityID} from '../selectors'
import {getIsLoggedIn} from '../../../containers/app/selectors'
import {getShippingFormValues, getFormValues, getFormRegisteredFields} from '../../../store/form/selectors'
import {receiveEntityID} from '../actions'
import {removeAllNotifications} from '../../../containers/app/actions'
import {SHIPPING_FORM_NAME} from '../../../containers/checkout-shipping/constants'

export const fetchShippingMethodsEstimate = (formKey) => {
    return (dispatch, getState) => {
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
}

export const fetchCheckoutShippingData = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then(([$, $response]) => {
            // entity_id is used for API calls
            const customerEntityID = parseCheckoutEntityID($response)
            dispatch(receiveEntityID({customerEntityID}))
            dispatch(receiveCheckoutShippingData(checkoutShippingParser($, $response)))
            return dispatch(receiveCheckoutData(parseCheckoutData($response)))
        })
        .then(() => {
            // fetch shipping estimate
            return dispatch(fetchShippingMethodsEstimate(SHIPPING_FORM_NAME))
        })
        .catch((error) => { console.info(error.message) })
}

export const submitShipping = (formValues) => {
    return (dispatch, getState) => {
        const currentState = getState()
        const {
            name,
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
        const names = name.split(' ')
        const shippingSelections = shipping_method.split('_')
        const address = {
            firstname: names.slice(0, -1).join(' '),
            lastname: names.slice(-1).join(' '),
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
        dispatch(receiveCheckoutData({shipping: {address}, emailAddress: username}))
        return makeJsonEncodedRequest(persistShippingURL, addressInformation, {method: 'POST'})
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON.payment_methods) {
                    // TO DO: send response data to the next container
                    browserHistory.push({
                        pathname: '/checkout/payment/'
                    })
                }
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
