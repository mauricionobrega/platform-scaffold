/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createSelector} from 'reselect'
import {getForm} from '../selectors'

export const getShippingForm = createSelector(getForm, (form) => form.shippingForm)

export const getShippingFormValues = createSelector(getShippingForm, (shippingForm) => { return shippingForm ? shippingForm.values : undefined })

export const getFormByKey = (formKey) => createSelector(getForm, (form) => { return form[formKey] ? form[formKey] : {} })

export const getFormValues = (formKey) => createSelector(getFormByKey(formKey), ({values}) => values)

export const getFormRegisteredFields = (formKey) => createSelector(getFormByKey(formKey), ({registeredFields}) => { return registeredFields ? registeredFields : [] })

export const getPaymentBillingForm = createSelector(getForm, (form) => form.paymentForm)
export const getPaymentBillingFormValues = createSelector(getPaymentBillingForm, (paymentForm) => paymentForm.values)

export const getConfirmationForm = createSelector(getForm, (form) => form.confirmationForm)
export const getConfirmationFormValues = createSelector(getConfirmationForm, (confirmationForm) => confirmationForm.values)
