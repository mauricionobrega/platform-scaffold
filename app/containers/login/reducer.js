import Immutable from 'immutable'
import {handleActions} from 'redux-actions'

import {isPageType} from '../../utils/router-utils'

import Login from './container'
import {SIGN_IN_SECTION, REGISTER_SECTION} from './constants'

import {onPageReceived} from '../app/actions'
import signinParser from './parsers/signin'
import registerParser from './parsers/register'

const signinFields = [
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

const registerPersonalFields = [
    {
        label: 'First Name',
        name: 'firstname',
        type: 'text',
        required: true,
        tooltip: false,
    },
    {
        label: 'Last Name',
        name: 'lastname',
        type: 'text',
        required: true,
        tooltip: false,
    },
    {
        label: 'Email',
        name: 'email',
        type: 'email',
        required: true,
        tooltip: false,
    },
    {
        label: 'Sign Up for Newsletter',
        name: 'is_subscribed',
        type: 'checkbox',
        required: false,
        tooltip: false,
    },
]

const registerSigninFields = [
    {
        label: 'Password',
        name: 'password',
        type: 'password',
        required: true,
        tooltip: false,
    },
    {
        label: 'Confirm Password',
        name: 'password_confirmation',
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

const initialState = Immutable.fromJS({
    title: 'Customer Login',
    signinSection: {
        href: '',
        heading: '',
        description: '',
        requiredText: '',
        form: {
            href: '',
            fields: signinFields,
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
                fields: registerPersonalFields,
            }, {
                heading: '',
                fields: registerSigninFields,
            }]
        },
    }
})

const formatSectionName = (sectionName) => `${sectionName}Section`

const merge = (object1, object2) => {
    return {...object1, ...object2}
}

export default handleActions({
    [onPageReceived]: (state, {payload}) => {
        const {$, $response, pageComponent, routeName} = payload
        if (isPageType(pageComponent, Login)) {
            let newState

            const infoModalOpen = !!state.get(formatSectionName(routeName)).get('infoModalOpen')

            if (routeName === SIGN_IN_SECTION) {
                newState = {
                    signinSection: merge(signinParser($, $response), {infoModalOpen})
                }
            } else if (routeName === REGISTER_SECTION) {
                newState = {
                    registerSection: merge(registerParser($, $response), {infoModalOpen})
                }
            }

            return state.merge(Immutable.fromJS(newState)).set('loaded', true)
        } else {
            return state
        }
    },
}, initialState)
