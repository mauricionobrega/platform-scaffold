/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {getCheckout} from '../../store/selectors'
import {createGetSelector} from 'reselect-immutable-helpers'

export const getCustomerEntityID = createGetSelector(getCheckout, 'customerEntityID')

export const getEmailAddress = createGetSelector(getCheckout, 'emailAddress')

export const getDefaultShippingAddressId = createGetSelector(getCheckout, 'defaultShippingAddressId')
