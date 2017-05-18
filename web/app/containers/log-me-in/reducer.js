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

const initialState = Immutable.fromJS({
    title: 'Customer Login',
    signinSection: {
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
