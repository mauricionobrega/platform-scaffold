import {createAction} from '../../utils/utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {SubmissionError} from 'redux-form'
import jasonLoginParser from './parsers/jason-login-parser'
import {getForm} from './selectors'

export const receiveData = createAction('Receive JasonLogin data')
export const process = ({payload: {$, $response}}) => {
    const parsed = jasonLoginParser($, $response)
    return receiveData(parsed)
}

// This action will change the `title` key in the local private state
export const changeTitle = createAction('Change JasonLogin title', 'title')

export const isFormResponseInvalid = ($response, formSelector) => $response.find(formSelector).length

const sendForm = (href, formValues, formSelector, resolve, reject) => {
    console.log('making request')
    return makeFormEncodedRequest(href, formValues, {method: 'POST'})
        .then(jqueryResponse)
        .then((res) => {
            console.log('got response')
            const [$, $response] = res // eslint-disable-line no-unused-vars
            if (isFormResponseInvalid($response, formSelector)) {
                const error = {
                    _error: 'Username or password is incorrect'
                }
                return reject(new SubmissionError(error))
            }

            window.location.href = '/customer/account'
            return resolve(true)
        })
        .catch((error) => {
            if (error.name !== SubmissionError) {
                reject(new SubmissionError({_error: 'Failed to login due to network error.'}))
            }
        })
}

export const submitLoginForm = (formValues, resolve, reject) => {
    return (dispatch, getStore) => {
        // const errors = validateSignInForm(formValues)
        // if (errors._error || Object.keys(errors.login).length) {
        //     return reject(new SubmissionError(errors))
        // }
        console.log('TESTTESTTEST')
        const {href, hiddenInputs} = getForm(getStore()).toJS()
        console.log(href)
        // const {href, hiddenInputs} = loginData.signinSection.form

        hiddenInputs.forEach((input) => {
            formValues[input.name] = input.value
        })
        console.log(formValues)

        return sendForm(href, formValues, '.form-login', resolve, reject)
    }
}
