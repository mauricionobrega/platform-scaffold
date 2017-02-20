import {createSelector} from 'reselect'
import {getForm} from '../selectors'

export const getShippingForm = createSelector(getForm, (form) => form.shippingForm)
export const getShippingFormValues = createSelector(getShippingForm, (shippingForm) => shippingForm.values)

export const getPaymentBillingForm = createSelector(getForm, (form) => form.paymentForm)
export const getPaymentBillingFormValues = createSelector(getPaymentBillingForm, (paymentForm) => paymentForm.values)

export const getConfirmationForm = createSelector(getForm, (form) => form.confirmationForm)
export const getConfirmationFormValues = createSelector(getConfirmationForm, (confirmationForm) => confirmationForm.values)
