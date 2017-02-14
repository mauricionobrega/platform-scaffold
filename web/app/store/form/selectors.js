import {createSelector} from 'reselect'
import {getForm} from '../selectors'

export const getShippingForm = createSelector(getForm, (form) => form.shippingForm)

export const getShippingFormValues = createSelector(getShippingForm, (shippingForm) => shippingForm.values)

export const getPaymentBillingForm = createSelector(getForm, (form) => form.paymentBillingAddressForm)

export const getPaymentBillingFormValues = createSelector(getPaymentBillingForm, (paymentBillingAddressForm) => paymentBillingAddressForm.values)
