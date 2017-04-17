import {browserHistory} from 'progressive-web-sdk/dist/routing'
import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {getPaymentBillingFormValues} from '../../store/form/selectors'
import {getEmailAddress} from '../../store/checkout/selectors'
import {getShippingAddress} from '../../store/checkout/shipping/selectors'
import {splitFullName} from '../../utils/utils'
import {submitPayment as submitPaymentCommand} from '../../integration-manager/checkout/commands'


export const receiveContents = createAction('Received CheckoutPayment Contents')
export const toggleFixedPlaceOrder = createAction('Toggled the fixed "Place Order" container', ['isFixedPlaceOrderShown'])
export const toggleCardInputRadio = createAction('Toggled the card method radio input', ['isNewCardInputSelected'])
export const toggleCompanyAptField = createAction('Showing the "Company" and "Apt #" fields', ['isCompanyOrAptShown'])
export const toggleNewAddressFields = createAction('Toggled new address fields', ['newShippingAddressIsEnabled'])
export const setCvvType = createAction('Setting CVV type', ['cvvType'])

export const submitPayment = () => (dispatch, getState) => {
    const currentState = getState()
    const billingValues = getPaymentBillingFormValues(currentState)
    const email = getEmailAddress(currentState)
    const sameAddress = billingValues.billing_same_as_shipping

    let address = {
        ...billingValues
    }

    if (sameAddress) {
        address = {
            ...address,
            ...getShippingAddress(currentState).toJS()
        }

    } else {
        const {firstname, lastname} = splitFullName(billingValues.name)
        address = {
            ...address,
            firstname,
            lastname,
            username: email
        }
    }
    return dispatch(submitPaymentCommand(address))
        .then((url) => {
            browserHistory.push({
                pathname: url
            })
        })
}
