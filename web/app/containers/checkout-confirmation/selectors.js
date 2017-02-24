import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import {getUi} from '../../store/selectors'

export const getCheckoutConfirmation = createSelector(getUi, ({checkoutConfirmation}) => checkoutConfirmation)

export const getEmailAddress = createGetSelector(getCheckoutConfirmation, 'emailAddress')
export const getIsRegistrationFormHidden = createGetSelector(getCheckoutConfirmation, 'isRegistrationFormHidden')
export const getIsModalShown = createGetSelector(getCheckoutConfirmation, 'isModalShown')
export const getOrderNumber = createGetSelector(getCheckoutConfirmation, 'orderNumber')
export const getOrderUrl = createGetSelector(getCheckoutConfirmation, 'orderUrl')
