import Immutable from 'immutable'
import {createReducer} from 'redux-act'

import {getComponentName} from '../../utils/utils'
import Login from './container'
import {openInfoModal, closeInfoModal} from './actions'

import {onPageReceived} from '../app/actions'
import parser from './parsers/login'

const placeholderFields = [
    {
        label: 'Email',
        name: 'login[username]',
        type: 'email',
        required: true,
        tooltip: false,
    },
    {
        label: 'Password',
        name: 'login[password]',
        type: 'password',
        required: true,
        tooltip: false,
    },
    {
        label: 'Remember Me',
        name: 'persistent_remember_me',
        type: 'checkbox',
        required: false,
        tooltip: false,
    },
]

const initialState = Immutable.Map({
    title: '',
    href: '',
    heading: '',
    description: '',
    form: {
        href: '',
        fields: placeholderFields,
        hiddenInputs: [],
        submitText: ''
    },
    infoModalOpen: false
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
    [openInfoModal]: (state) => {
        return state.set('infoModalOpen', true)
    },
    [closeInfoModal]: (state) => {
        return state.set('infoModalOpen', false)
    }

}, initialState)
