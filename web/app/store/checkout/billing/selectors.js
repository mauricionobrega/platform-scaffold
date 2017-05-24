/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getCheckout} from '../../selectors'

export const getBilling = createGetSelector(getCheckout, 'billing', Immutable.Map())

export const getBillingCustomContent = createGetSelector(getBilling, 'custom')

export const getBillingInitialValues = createGetSelector(getBilling, 'initialValues')

export const getBillingAddress = createGetSelector(getBilling, 'address', Immutable.Map())
