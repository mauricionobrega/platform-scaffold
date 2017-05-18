import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload} from '../../utils/reducer-utils'
import {receiveData} from './actions'

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
        form: {
            href: '',
            fields: signinFields,
            hiddenInputs: [],
            submitText: ''
        },
    }
})

export default handleActions({
    [receiveData]: mergePayload
}, initialState)
