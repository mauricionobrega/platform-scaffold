import Immutable from 'immutable'
import {createReducer} from 'redux-act'
import {getComponentName} from '../../utils/utils'
import PLP from './container'

import {onPageReceived} from '../app/actions'
import parser from './parsers/plp'

const initialState = Immutable.Map({
    hasProducts: false,
    loaded: false,
    numItems: '',
    noResultsText: '',
    products: [{}, {}, {}, {}],
    title: '',
})

const plp = createReducer({
    [onPageReceived]: (state, action) => {
        const {$, $response, pageType} = action

        if (pageType === getComponentName(PLP)) {
            return state.merge(Immutable.fromJS({
                ...parser($, $response)
            })).set('loaded', true)
        } else {
            return state
        }
    },
}, initialState)

export default plp
