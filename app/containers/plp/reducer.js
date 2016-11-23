import Immutable from 'immutable'
import {createRoutedReducer} from '../../utils/router-utils'

import plpParser from './parsers/plp'
import PLP from './container'

export const initialState = Immutable.Map({
    isPlaceholder: true,
    hasProducts: true,
    numItems: '',
    noResultsText: '',
    products: [{}, {}, {}, {}],
    title: ''
})

export default createRoutedReducer(PLP, plpParser, initialState)
