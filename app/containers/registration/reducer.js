import Immutable from 'immutable'
import {createReducer} from 'redux-act'

import {getComponentName} from '../../utils/utils'
import Registration from './container'
import {openInfoModal, closeInfoModal} from './actions'

import {onPageReceived} from '../app/actions'
import parser from './parsers/registration'

const initialState = Immutable.Map({
    title: 'Customer Login',
    heading: 'New Customers',
    description: 'Creating an account has many benefits: check out faster, keep more than one address, track orders and more.',
    requiredText: '* Required Fields',
    href: '',
    form: {
        href: '',
        hiddenInputs: [],
        submitText: '',
        sections: [{
            heading: '',
            fields: [],
        }]
    },
    infoModalOpen: false
})

export default createReducer({
    [onPageReceived]: (state, action) => {
        const {$, $response, pageType} = action
        if (pageType === getComponentName(Registration)) {
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
