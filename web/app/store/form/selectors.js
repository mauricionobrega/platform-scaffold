import {createSelector} from 'reselect'
import {getForm} from '../selectors'

export const getShippingForm = createSelector(getForm, (form) => form.shippingForm)
export const getConfirmationForm = createSelector(getForm, (form) => form.confirmationForm)

export const getShippingFormValues = createSelector(getShippingForm, (shippingForm) => shippingForm.values)
export const getConfirmationFormValues = createSelector(getConfirmationForm, (confirmationForm) => confirmationForm.values)
