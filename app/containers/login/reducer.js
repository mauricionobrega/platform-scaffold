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
    signinSection: Immutable.Map({
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
        infoModalOpen: false
    }),
    registerSection: Immutable.Map({
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
        infoModalOpen: false
    })
})

const formatSectionName = (sectionName) => `${sectionName}Section`

const merge = (object1, object2) => {
    return {...object1, ...object2}
}

export default createReducer({
    [onPageReceived]: (state, action) => {
        const {$, $response, pageType, routeName} = action
        if (pageType === getComponentName(Login)) {
            let newState

            const infoModalOpen = !!state.get(formatSectionName(routeName)).get('infoModalOpen')

            if (routeName === Login.SIGN_IN_SECTION) {
                newState = {
                    signinSection: merge(signinParser($, $response), {infoModalOpen})
                }
            } else if (routeName === Login.REGISTER_SECTION) {
                newState = {
                    registerSection: merge(registerParser($, $response), {infoModalOpen})
                }
            }

            return state.merge(Immutable.fromJS(newState)).set('loaded', true)
        } else {
            return state
        }
    },
    [openInfoModal]: (state, action) => {
        return state.updateIn([formatSectionName(action.sectionName), 'infoModalOpen'], () => true)
    },
    [closeInfoModal]: (state, action) => {
        return state.updateIn([formatSectionName(action.sectionName), 'infoModalOpen'], () => false)
    }

}, initialState)
