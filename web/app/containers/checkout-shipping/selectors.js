import {createSelector} from 'reselect'
import Immutable from 'immutable'
import {createGetSelector} from '../../utils/selector-utils'
import {getUi} from '../../store/selectors'

export const getCheckoutShipping = createSelector(getUi, ({checkoutShipping}) => checkoutShipping)

export const getShippingFormTitle = createGetSelector(getCheckoutShipping, 'formTitle')

export const getIsCompanyOrAptShown = createGetSelector(getCheckoutShipping, 'isCompanyOrAptShown')

export const getShippingMethods = createGetSelector(getCheckoutShipping, 'shippingMethods', Immutable.List())

export const getCustomerEmailRecognized = createGetSelector(getCheckoutShipping, 'customerEmailRecognized')

export const getEmailError = createGetSelector(getCheckoutShipping, 'emailError')
