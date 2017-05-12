/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {browserHistory} from 'progressive-web-sdk/dist/routing'
import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {getPaymentBillingFormValues} from '../../store/form/selectors'
import {getEmailAddress} from '../../store/checkout/selectors'
import {getShippingAddress} from '../../store/checkout/shipping/selectors'
import {submitPayment as submitPaymentCommand} from '../../integration-manager/checkout/commands'
import {splitFullName} from '../../utils/utils'

export const receiveContents = createAction('Received CheckoutPayment Contents')
export const toggleFixedPlaceOrder = createAction('Toggled the fixed "Place Order" container', ['isFixedPlaceOrderShown'])
export const toggleCardInputRadio = createAction('Toggled the card method radio input', ['isNewCardInputSelected'])
export const toggleCompanyAptField = createAction('Showing the "Company" and "Apt #" fields', ['isCompanyOrAptShown'])
export const toggleNewAddressFields = createAction('Toggled new address fields', ['newShippingAddressIsEnabled'])
export const setCvvType = createAction('Setting CVV type', ['cvvType'])

export const submitPayment = () => (dispatch, getState) => {
    const currentState = getState()
    const billingFormValues = getPaymentBillingFormValues(currentState)
    const billingIsSameAsShippingAddress = billingFormValues.billing_same_as_shipping

    // Careful. This get's completely overwritten below
    let address = null

    const email = getEmailAddress(currentState)

    if (billingIsSameAsShippingAddress) {
        const shippingAddress = getShippingAddress(currentState).toJS()
        address = {
            // NOT spreading `address` because it contains many incorrectly
            // formatted keys, as far as the payment-information request
            // is concerned
            customerAddressId: `${shippingAddress.customerAddressId}`,
            customerId: `${shippingAddress.customerId}`,
            username: email,
            firstname: shippingAddress.firstname,
            lastname: shippingAddress.lastname,
            company: shippingAddress.company,
            postcode: shippingAddress.postcode,
            city: shippingAddress.city,
            street: shippingAddress.street,
            region: shippingAddress.region,
            regionCode: shippingAddress.regionCode,
            regionId: `${shippingAddress.regionId}`,
            countryId: shippingAddress.countryId,
            saveInAddressBook: false
        }
    } else {
        const {
            name,
            company,
            addressLine1,
            addressLine2,
            countryId,
            city,
            regionId,
            postcode,
        } = billingFormValues

        const {firstname, lastname} = splitFullName(name)

        address = {
            firstname,
            lastname,
            username: email,
            company: company || '',
            postcode,
            city,
            street: addressLine2 ? [addressLine1, addressLine2] : [addressLine1],
            regionId,
            countryId,
            saveInAddressBook: false
        }
    }

    return dispatch(submitPaymentCommand(address))
        .then((url) => {
            browserHistory.push({
                pathname: url
            })
        })
}
