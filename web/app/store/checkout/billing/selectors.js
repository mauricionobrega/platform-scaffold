import Immutable from 'immutable'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getCheckout} from '../../selectors'

export const getBilling = createGetSelector(getCheckout, 'billing', Immutable.Map())

export const getBillingInitialValues = createGetSelector(getBilling, 'initialValues')
