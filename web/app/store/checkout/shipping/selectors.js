/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createSelector} from 'reselect'
import Immutable from 'immutable'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getCheckout} from '../../selectors'

export const getShipping = createGetSelector(getCheckout, 'shipping', Immutable.Map())

export const getSavedAddresses = createGetSelector(getCheckout, 'savedAddresses', Immutable.List())

export const getShippingMethods = createGetSelector(getShipping, 'shippingMethods', Immutable.List())

export const getShippingAddress = createGetSelector(getShipping, 'address', Immutable.Map())

export const getInitialShippingAddress = createSelector(
    getCheckout,
    getShippingAddress,
    (checkout, address) => {
        const savedAddressId = checkout.get('defaultShippingAddressId')
        if (savedAddressId) {
            return address.set('saved_address', `${savedAddressId}`)
        }
        return address
    }
)

export const getSelectedShippingMethodValue = createGetSelector(getShippingAddress, 'shipping_method', '')

export const getSelectedShippingMethod = createSelector(
    getShippingMethods,
    getSelectedShippingMethodValue,
    (shippingMethods, selectedMethodValue) => {
        if (!shippingMethods.size) {
            return Immutable.Map()
        }
        const selectedValue = shippingMethods.filter((method) => method.get('value') === selectedMethodValue)
        return selectedValue.size ? selectedValue.get(0) : shippingMethods.get(0)
    })

export const getSelectedShippingRate = createGetSelector(getSelectedShippingMethod, 'cost', '')

export const getSelectedShippingLabel = createGetSelector(getSelectedShippingMethod, 'label', '')

export const getShippingFirstName = createGetSelector(getShippingAddress, 'firstname', '')

export const getShippingLastName = createGetSelector(getShippingAddress, 'lastname', '')

export const getShippingFullName = createSelector(getShippingFirstName, getShippingLastName, (firstName, lastName) => `${firstName} ${lastName}`)

export const getStreet = createGetSelector(getShippingAddress, 'street', Immutable.List())

export const getStreetLineOne = createSelector(getStreet, (street) => { return street.size ? street.get(0) : '' })

export const getStreetLineTwo = createSelector(getStreet, (street) => { return street.size ? street.get(1) : '' })

export const getTelephone = createGetSelector(getShippingAddress, 'telephone')

export const getPostcode = createGetSelector(getShippingAddress, 'postcode')

export const getCompany = createGetSelector(getShippingAddress, 'company')

export const getRegionId = createGetSelector(getShippingAddress, 'regionId')

export const getCountryId = createGetSelector(getShippingAddress, 'countryId')

export const getCity = createGetSelector(getShippingAddress, 'city')
