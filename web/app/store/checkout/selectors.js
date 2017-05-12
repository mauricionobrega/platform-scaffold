/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {getCheckout} from '../../store/selectors'
import {createGetSelector} from 'reselect-immutable-helpers'

export const getEmailAddress = createGetSelector(getCheckout, 'emailAddress')

// This selector is only needed by fetchShippingMethodsEstimate (store/checkout/shipping/actions)
// which is still used by the cart & payment pages
// once those pages have been fully moved into the merlins connector this selector will no longer be needed
export const getCustomerEntityID = createGetSelector(getCheckout, 'customerEntityID')
