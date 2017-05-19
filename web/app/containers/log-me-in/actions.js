import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {createAction} from '../../utils/utils'
import {makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {getLogin} from './selectors'
import signinParser from './parsers/signin'

export const receiveData = createAction('Receive Login Data')

export const process = ({payload: {$, $response}}) => {
    return receiveData({
        signinSection: signinParser($, $response)
    })
}

export const submitSignInForm = (formValues, resolve) => {
    return (dispatch, getStore) => {
        const loginData = getLogin(getStore()).toJS()
        const {href, hiddenInputs} = loginData.signinSection.form

        hiddenInputs.forEach((input) => {
            formValues[input.name] = input.value
        })
        return makeFormEncodedRequest(href, formValues, {method: 'POST'})
            .then(jqueryResponse)
            .then((res) => {
                const [$, $response] = res // eslint-disable-line no-unused-vars
                window.location.href = '/customer/account'
                return resolve(true)
            })
    }
}