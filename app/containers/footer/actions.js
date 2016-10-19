import * as constants from './constants'
import * as utils from '../../utils/utils'

export const newsletterSignupComplete = utils.createAction('Newsletter signup complete',
    'signupStatus'
)

export const signUpToNewsletter = (action, method, data) => {
    return (dispatch) => {

        const onSuccess = () => {
            dispatch(newsletterSignupComplete(constants.SIGNUP_SUCCESSFUL))
        }

        const onFail = () => {
            dispatch(newsletterSignupComplete(constants.SIGNUP_FAILED))
        }

        const opts = {
            method,
            body: utils.formEncode(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        return utils.makeRequest(action, opts)
            .then(onSuccess)
            .catch(onFail)
    }
}
