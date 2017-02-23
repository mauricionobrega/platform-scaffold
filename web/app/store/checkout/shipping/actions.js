
import {makeJsonEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {getCustomerEntityID} from '../selectors'
import {getIsLoggedIn} from '../../../containers/app/selectors'
import {getFormValues, getFormRegisteredFields} from '../../form/selectors'
import {parseShippingMethods} from './parser'
import {receiveShippingMethodInitialValues, receiveCheckoutData} from '../actions'



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
            address.country_id = getRegisteredFieldValue('country_id')
            address.region_id = getRegisteredFieldValue('region_id')
            address.postcode = getRegisteredFieldValue('postcode')
            if (formValues.region) {
                address.region = getRegisteredFieldValue('region')
                // Remove the region_id in case we have an old value
                delete address.region_id
            }
        }
        const getEstimateURL = `/rest/default/V1/${isLoggedIn ? 'carts/mine' : `guest-carts/${entityID}`}/estimate-shipping-methods`
        makeJsonEncodedRequest(getEstimateURL, {address}, {method: 'POST'})
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
