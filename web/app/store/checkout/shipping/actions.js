import {makeJsonEncodedRequest, makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {parseLocationData} from '../../../utils/utils'
import {getCustomerEntityID} from '../selectors'
import {getIsLoggedIn} from '../../../containers/app/selectors'
import {getFormValues, getFormRegisteredFields} from '../../form/selectors'
import {parseShippingMethods} from './parser'
import {receiveShippingMethodInitialValues, receiveSavedShippingAddresses, receiveCheckoutData} from '../actions'

export const fetchShippingMethodsEstimate = (formKey) => {
    return (dispatch, getState) => {
        const currentState = getState()
        const isLoggedIn = getIsLoggedIn(currentState)
        const formValues = getFormValues(formKey)(currentState)
        const entityID = getCustomerEntityID(currentState)
        const registeredFieldNames = getFormRegisteredFields(formKey)(currentState).map(({name}) => name)

        // @TODO: We should probably pull this data from the STATE instead of form
        //        fields since there might not be fields, i.e. w/ Saved Addresses
        const address = parseLocationData(formValues, registeredFieldNames)

        const getEstimateURL = `/rest/default/V1/${isLoggedIn ? 'carts/mine' : `guest-carts/${entityID}`}/estimate-shipping-methods`
        return makeJsonEncodedRequest(getEstimateURL, {address}, {method: 'POST'})
            .then((response) => response.json())
            .then((responseJSON) => {
                const shippingMethods = parseShippingMethods(responseJSON)
                const initialValues = {
                    shipping_method: shippingMethods[0].value,
                    ...address
                }
                dispatch(receiveCheckoutData({shipping: {shippingMethods}}))
                dispatch(receiveShippingMethodInitialValues({address: initialValues})) // set initial value for method
            })
    }
}

export const fetchSavedShippingAddresses = () => {
    return (dispatch, getState) => {
        const currentState = getState()
        const isNotLoggedIn = !getIsLoggedIn(currentState)

        if (isNotLoggedIn) {
            return false
        }

        const fetchURL = `/rest/default/V1/carts/mine`
        return makeRequest(fetchURL, {method: 'GET'})
            .then((response) => response.json())
            .then(({customer}) => {
                dispatch(receiveSavedShippingAddresses(customer.addresses))
            })
    }
}
