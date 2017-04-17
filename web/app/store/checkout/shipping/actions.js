
import {makeJsonEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {getLocationData} from '../../../utils/utils'
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
        const address = getLocationData(formValues, registeredFieldNames)

        const getEstimateURL = `/rest/default/V1/${isLoggedIn ? 'carts/mine' : `guest-carts/${entityID}`}/estimate-shipping-methods`
        return makeJsonEncodedRequest(getEstimateURL, {address}, {method: 'POST'})
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
