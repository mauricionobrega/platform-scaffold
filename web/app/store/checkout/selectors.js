import {getCheckout} from '../../store/selectors'
import {createGetSelector} from '../../utils/selector-utils'

export const getCustomerEntityID = createGetSelector(getCheckout, 'customerEntityID')

export const getEmailAddress = createGetSelector(getCheckout, 'emailAddress')
