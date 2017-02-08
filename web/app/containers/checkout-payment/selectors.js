import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import {getUi} from '../../store/selectors'

export const getCheckoutPayment = createSelector(getUi, ({checkoutPayment}) => checkoutPayment)

export const getIsFixedPlaceOrderShown = createGetSelector(getCheckoutPayment, 'isFixedPlaceOrderShown')

export const getHasExistingCreditCard = createGetSelector(getCheckoutPayment, 'hasExistingCreditCard')

export const getIsNewCardInputSelected = createGetSelector(getCheckoutPayment, 'isNewCardInputSelected')

export const getIsCompanyOrAptShown = createGetSelector(getCheckoutPayment, 'isCompanyOrAptShown')

export const getNewShippingAddressIsEnabled = createGetSelector(getCheckoutPayment, 'newShippingAddressIsEnabled')
