import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import {getUi} from '../../store/selectors'

export const getCheckoutPayment = createSelector(getUi, ({checkoutPayment}) => checkoutPayment)

export const getIsFixedPlaceOrderShown = createGetSelector(getCheckoutPayment, 'isFixedPlaceOrderShown')
