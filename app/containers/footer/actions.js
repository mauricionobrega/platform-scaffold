import * as constants from './constants'
import * as utils from '../../utils/utils'
import {showClippy} from '../app/actions'

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

        return utils.makeFormEncodedRequest(action, data, {method})
            .then(onSuccess)
            .catch(onFail)
    }
}

let easterEggClickCount = 0
export const clickClippyEasterEgg = () => {
    return (dispatch) => {
        easterEggClickCount++

        // 100% arbitary number of clicks to show the Easter Egg
        if (easterEggClickCount >= 4) {
            dispatch(showClippy())
        }
    }
}
