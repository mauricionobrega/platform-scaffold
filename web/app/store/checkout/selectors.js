import {getCheckout} from '../../store/selectors'
import {createGetSelector} from 'reselect-immutable-helpers'

export const getCustomerEntityID = createGetSelector(getCheckout, 'customerEntityID')

export const getEmailAddress = createGetSelector(getCheckout, 'emailAddress')
