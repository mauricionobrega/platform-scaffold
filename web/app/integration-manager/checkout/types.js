/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import * as Runtypes from 'runtypes'
import {Nullable, Money, Identifier, Email, Text} from '../types'

const CountryID = Identifier

const Country = Runtypes.Record({
    id: CountryID,
    label: Text,
    regionRequired: Runtypes.Boolean,
    postcodeRequired: Runtypes.Boolean
})

const Region = Runtypes.Record({
    countryId: CountryID,
    id: Identifier,
    label: Text
})

export const Address = Runtypes.Record({
    name: Text,
    addressLine1: Text,
    addressLine2: Text,
    countryId: CountryID,
    city: Text,
    // We expect only one of these two to be non-null
    regionId: Nullable(Identifier),
    region: Nullable(Text),
    postcode: Text,
    telephone: Text
})

const StoredAddress = Address.And(Runtypes.Record({id: Identifier}))

const ShippingMethod = Runtypes.Record({
    label: Text,
    cost: Money,
    id: Identifier
})

export const ShippingMethods = Runtypes.Array(ShippingMethod)

export const LocationList = Runtypes.Record({
    countries: Runtypes.Array(Country),
    regions: Runtypes.Array(Region)
})

export const Checkout = Runtypes.Record({
    availableLocations: LocationList,
    billingSameAsShipping: Runtypes.Boolean,
    email: Email,
    shippingMethods: Runtypes.Array(ShippingMethod),
    selectedShippingMethodId: Identifier,
    storedAddresses: Runtypes.Array(StoredAddress)
}).And(Runtypes.Optional({
    shippingAddress: Nullable(Address),
    billingAddress: Nullable(Address),
}))
