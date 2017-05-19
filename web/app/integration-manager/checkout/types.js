/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import * as Runtypes from 'runtypes'
import {Identifier, Text} from '../types'

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

export const LocationList = Runtypes.Record({
    countries: Runtypes.Array(Country),
    regions: Runtypes.Array(Region)
})
