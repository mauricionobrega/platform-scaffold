import Immutable from 'immutable'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getCheckout} from '../../selectors'

export const getPayment = createGetSelector(getCheckout, 'payment', Immutable.Map())

export const getPaymentAddress = createGetSelector(getPayment, 'address', Immutable.Map())
