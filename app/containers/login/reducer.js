import Immutable from 'immutable'
import {createReducer} from 'redux-act'

import {getComponentName} from '../../utils/utils'
import Login from './container'

import {onPageReceived, fetchPage} from '../app/actions'
import parser from './parsers/shared'

const initialState = Immutable.Map({
    title: "",
    isLogin: true,
    login: {
        href: "",
        panelTitle: "",
        heading: "",
        description: "",
        form: {
            href: "",
            fields: [],
            hiddenInputs: [],
            submitText: ""
        }
    },
    register: {
        href: "",
        panelTitle: "",
        heading: "",
        description: "",
        form: {
            href: "",
            fields: [],
            hiddenInputs: [],
            submitText: ""
        }
    },
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
