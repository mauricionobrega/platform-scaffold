import Immutable from 'immutable'
import {createSelector} from 'reselect'

import {createGetSelector} from '../../../utils/selector-utils'
import {getShippingFormValues} from '../../form/selectors'
import {getCheckout} from '../../selectors'

export const getLocations = createGetSelector(getCheckout, 'locations', Immutable.Map())
export const getCountries = createGetSelector(getLocations, 'countries', Immutable.List())
export const getRegions = createGetSelector(getLocations, 'regions', Immutable.List())

export const getSelectedCountryID = createSelector(getShippingFormValues, (values) => { return values ? values.country_id : null })
export const getDefaultRegionEntry = createGetSelector(getRegions, 0)

// Filter list of available regions based on what user has selected as country
export const getRegionsForCountry = createSelector(getRegions, getSelectedCountryID, (regions, id) => {
    return regions.filter((region) => region.get('country_id') === id)
})

// Insert default region option at top of list if we have regions to display
export const getAvailableRegions = createSelector(getRegionsForCountry, getDefaultRegionEntry, (regions, defaultRegion) => {
    return regions.size === 0 ? regions : regions.unshift(defaultRegion)
})
