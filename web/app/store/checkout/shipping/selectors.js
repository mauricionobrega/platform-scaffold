import Immutable from 'immutable'
import {createGetSelector} from '../../../utils/selector-utils'
import {getCheckout} from '../../selectors'

export const getShipping = createGetSelector(getCheckout, 'shipping', Immutable.Map())

export const getShippingInitialValues = createGetSelector(getShipping, 'initialValues')

export const getShippingAddress = createGetSelector(getShipping, 'address')
