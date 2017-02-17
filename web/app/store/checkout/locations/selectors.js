import Immutable from 'immutable'
import {createGetSelector} from '../../../utils/selector-utils'
import {getCheckout} from '../../selectors'

export const getLocations = createGetSelector(getCheckout, 'locations', Immutable.Map())

export const getCountries = createGetSelector(getLocations, 'countries', Immutable.List())

export const getRegions = createGetSelector(getLocations, 'regions', Immutable.List())
