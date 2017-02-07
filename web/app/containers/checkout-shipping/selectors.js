import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import {getUi} from '../../store/selectors'

export const getCheckoutShipping = createSelector(getUi, ({checkoutShipping}) => checkoutShipping)

export const getShippingFormTitle = createGetSelector(getCheckoutShipping, 'formTitle')

export const getIsCompanyOrAptShown = createGetSelector(getCheckoutShipping, 'isCompanyOrAptShown')
