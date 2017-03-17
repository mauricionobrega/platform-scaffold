import * as parser from './parsers/parser'
import * as constants from './constants'
import * as utils from '../../utils/utils'
import * as commands from '../../integration-manager/commands'

export const receiveData = utils.createAction('Receive footer data')

export const process = ({payload: {$, $response}}) => receiveData({
    newsletter: parser.parseNewsLetter($response),
    navigation: parser.parseNavigation($, $response)
})

export const newsletterSignupComplete = utils.createAction('Newsletter signup complete',
    'signupStatus'
)

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
