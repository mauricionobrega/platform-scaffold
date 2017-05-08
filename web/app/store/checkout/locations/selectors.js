import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'

import {getFormValues} from '../../form/selectors'
import {getCheckout} from '../../selectors'

export const getLocations = createGetSelector(getCheckout, 'locations', Immutable.Map())
export const getCountries = createGetSelector(getLocations, 'countries', Immutable.List())
export const getRegions = createGetSelector(getLocations, 'regions', Immutable.List())

export const getSelectedCountryID = (formKey) => createSelector(
    getFormValues(formKey),
    (values) => { return values ? values.countryId : null }
)

export const getDefaultRegionEntry = createGetSelector(getRegions, 0)


// Filter list of available regions based on what user has selected as country
// Accepts a formKey that determines which form's country selection should be used
export const getRegionsForCountry = (formKey) => createSelector(
    getRegions,
    getSelectedCountryID(formKey),
    (regions, id) => regions.filter((region) => region.get('country_id') === id)
)

// Insert default region option at top of list if we have regions to display
// Accepts a formKey that determines which form's country selection should be used
export const getAvailableRegions = (formKey) => createSelector(
    getRegionsForCountry(formKey),
    getDefaultRegionEntry,
    (regions, defaultRegion) => {
        return (
            regions.size === 0 || Immutable.is(regions.get(0), defaultRegion)
                ? regions
                : regions.unshift(defaultRegion)
        )
    }
)
