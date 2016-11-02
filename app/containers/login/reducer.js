import Immutable from 'immutable'
import {createReducer} from 'redux-act'

import {getComponentName} from '../../utils/utils'
import Login from './container'

import {onPageReceived} from '../app/actions'
import parser from './parsers/login'

const initialState = Immutable.Map({
    title: '',
    href: '',
    heading: '',
    description: '',
    form: {
        href: '',
        fields: [],
        hiddenInputs: [],
        submitText: ''
    }
})

export default createReducer({
    [onPageReceived]: (state, action) => {
        const {$, $response, pageType} = action
        if (pageType === getComponentName(Login)) {
            return state.merge(Immutable.fromJS({
                ...parser($, $response)
            })).set('loaded', true)
        } else {
            return state
        }
    },
}, initialState)
