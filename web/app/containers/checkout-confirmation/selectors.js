/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'

export const getCheckoutConfirmation = createSelector(getUi, ({checkoutConfirmation}) => checkoutConfirmation)

export const getIsRegistrationFormHidden = createGetSelector(getCheckoutConfirmation, 'isRegistrationFormHidden')
export const getOrderNumber = createGetSelector(getCheckoutConfirmation, 'orderNumber')
export const getOrderUrl = createGetSelector(getCheckoutConfirmation, 'orderUrl')
