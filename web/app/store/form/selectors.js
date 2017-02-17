import {createSelector} from 'reselect'
import {getForm} from '../selectors'

// export const getShippingForm = createSelector(getForm, (form) => form.shippingForm)
//
// export const getShippingFormValues = createSelector(getShippingForm, (shippingForm) => { return shippingForm ? shippingForm.values : undefined })

export const getFormByKey = (formKey) => createSelector(getForm, (form) => { return form[formKey] ? form[formKey] : {} })

export const getFormValues = (formKey) => createSelector(getFormByKey(formKey), ({values}) => values)
