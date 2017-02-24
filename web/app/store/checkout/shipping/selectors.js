import {createSelector} from 'reselect'
import Immutable from 'immutable'
import {createGetSelector} from '../../../utils/selector-utils'
import {getCheckout} from '../../selectors'

export const getShipping = createGetSelector(getCheckout, 'shipping', Immutable.Map())

export const getShippingInitialValues = createGetSelector(getShipping, 'initialValues')

export const getShippingMethods = createGetSelector(getShipping, 'shippingMethods', Immutable.List())

export const getDefaultShippingMethod = createGetSelector(getShippingMethods, 0, Immutable.Map())

export const getDefaultShippingRate = createGetSelector(getDefaultShippingMethod, 'cost')

export const getShippingAddress = createGetSelector(getShipping, 'address', Immutable.Map())

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
