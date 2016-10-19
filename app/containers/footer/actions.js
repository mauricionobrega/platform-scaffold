import * as constants from './constants'
import * as utils from '../../utils/utils'

export const NEWSLETTER_SIGNUP_COMPLETE = 'NEWSLETTER_SIGNUP_COMPLETE'
export const newsletterSignupComplete = (signupStatus) => {
    return {
        type: NEWSLETTER_SIGNUP_COMPLETE,
        signupStatus
    }
}

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
