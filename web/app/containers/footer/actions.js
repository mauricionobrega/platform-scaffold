import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import * as parser from './parsers/parser'
import * as constants from './constants'
import * as commands from '../../integration-manager/commands'

export const receiveData = createAction('Receive footer data')

export const process = ({payload: {$response}}) => receiveData({
    newsletter: parser.parseNewsLetter($response)
})

export const newsletterSignupComplete = createAction('Newsletter signup complete', ['signupStatus'])

export const signUpToNewsletter = (data) => {
    return (dispatch) => {

        const onSuccess = () => {
            dispatch(newsletterSignupComplete(constants.SIGNUP_SUCCESSFUL))
        }

        const onFail = () => {
            dispatch(newsletterSignupComplete(constants.SIGNUP_FAILED))
        }

        return commands.submitNewsletter(data)
            .then(onSuccess)
            .catch(onFail)
    }
}
