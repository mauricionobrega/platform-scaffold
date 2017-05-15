/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {getCheckout} from '../selectors'
import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getFormValues} from '../form/selectors'

export const getLocations = createGetSelector(getCheckout, 'locations', Immutable.Map())
export const getCountries = createGetSelector(getLocations, 'countries', Immutable.List())
export const getRegions = createGetSelector(getLocations, 'regions', Immutable.List())

export const getSelectedCountryID = (formKey) => createSelector(
    getFormValues(formKey),
    (values) => { return values ? values.countryId : null }
)

// Filter list of available regions based on what user has selected as country
// Accepts a formKey that determines which form's country selection should be used
export const getAvailableRegions = (formKey) => createSelector(
    getRegions,
    getSelectedCountryID(formKey),
    (regions, id) => regions.filter((region) => region.get('countryId') === id)
)

export const getShippingMethods = createGetSelector(getCheckout, 'shippingMethods', Immutable.List())

export const getEmailAddress = createGetSelector(getCheckout, 'emailAddress')

export const getBillingAddress = createGetSelector(getCheckout, 'billingAddress')