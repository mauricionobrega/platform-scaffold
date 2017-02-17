
import {makeJsonEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {getCustomerEntityID} from '../selectors'
import {getIsLoggedIn} from '../../../containers/app/selectors'
import {getFormValues} from '../../form/selectors'
import {parseShippingMethods} from './parser'
import {receiveShippingMethodInitialValues, receiveCheckoutData} from '../actions'


export const fetchShippingMethodsEstimate = (formKey) => {
    return (dispatch, getState) => {
        debugger
        const currentState = getState()
        const isLoggedIn = getIsLoggedIn(currentState)
        const formValues = getFormValues(formKey)(currentState)
        const entityID = getCustomerEntityID(currentState)
        // Default values to use if none have been selected
        const address = {country_id: 'US', region_id: '0', postcode: null}
        if (formValues) {
            address.country_id = formValues.country_id
            address.region_id = formValues.region_id
            address.postcode = formValues.postcode
        }
        const getEstimateURL = `https://www.merlinspotions.com/rest/default/V1/${isLoggedIn ? 'carts/mine' : `guest-carts/${entityID}`}/estimate-shipping-methods`
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
