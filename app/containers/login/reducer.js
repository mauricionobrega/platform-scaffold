import Immutable from 'immutable'
import {createReducer} from 'redux-act'

import {getComponentName} from '../../utils/utils'
import Login from './container'
import {openInfoModal, closeInfoModal} from './actions'

import {onPageReceived} from '../app/actions'
import signinParser from './parsers/signin'
import registerParser from './parsers/register'

const initialState = Immutable.Map({
    title: 'Customer Login',
    signinSection: {
        href: '',
        heading: '',
        description: '',
        requiredText: '',
        form: {
            href: '',
            fields: [],
            hiddenInputs: [],
            submitText: ''
        },
    },
    registerSection: {
        href: '',
        heading: '',
        description: '',
        requiredText: '',
        form: {
            href: '',
            hiddenInputs: [],
            submitText: '',
            sections: [{
                heading: '',
                fields: [],
            }]
        },
    },
    infoModalOpen: false
})

export default createReducer({
    [onPageReceived]: (state, action) => {
        const {$, $response, pageType, routeName} = action
        if (pageType === getComponentName(Login)) {
            let newState

            if (routeName === Login.SIGN_IN_SECTION) {
                newState = {
                    signinSection: signinParser($, $response)
                }
            } else if (routeName === Login.REGISTER_SECTION) {
                newState = {
                    registerSection: registerParser($, $response)
                }
            }

            return state.merge(Immutable.fromJS(newState)).set('loaded', true)
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
