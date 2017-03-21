import {noop} from 'progressive-web-sdk/dist/utils/utils'
import {receiveLoginPageData} from '../../login/responses'
import {SIGN_IN_URL} from '../constants'

export const fetchLoginData = () => (dispatch) => {
    return new Promise(() => {
        return dispatch(receiveLoginPageData({
            signinSection: {
                heading: 'RETURNING CUSTOMERS',
                description: 'If you are a registered user, please enter your email and password.',
                requiredText: '* Required Fields',
                isFormLoaded: true,
                href: SIGN_IN_URL
            },
            registerSection: {
                heading: 'NEW CUSTOMERS',
                description: 'Creating an account is easy. Just fill out the form below and enjoy the benefits of being a registered customer.',
                requiredText: '* Required Fields',
                href: `${SIGN_IN_URL}/create`,
                isFormLoaded: true,
                form: {
                    sections: [{
                        heading: 'Personal Information',

                    }, {
                        heading: 'Sign-in Information',
                    }]
                }
            }
        }))
    })
}

export const navigateToSection = () => (dispatch) => noop()
