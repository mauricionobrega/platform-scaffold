import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import {getUi} from '../../store/selectors'

export const getCart = createSelector(getUi, ({cart}) => cart)

export const getCountries = createGetSelector(getCart, 'countries')
export const getStateProvinces = createGetSelector(getCart, 'stateProvinces')
