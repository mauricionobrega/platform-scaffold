import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload} from '../../utils/reducer-utils'
import {receiveLoginPageData} from '../../integration-manager/login/responses'

const signinFields = [{}, {}, {}]

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
    signinSection: {
        form: {
            href: '',
            fields: signinFields,
        },
    },
    registerSection: {
        form: {
            href: '',
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

export default handleActions({
    [receiveLoginPageData]: mergePayload
}, initialState)
