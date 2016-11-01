import {createAction, makeRequest, formEncode} from '../../utils/utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {onPageReceived} from '../app/actions'
import {SubmissionError} from 'redux-form'

export const submitForm = (formValues, resolve, reject) => {
    return (dispatch, getStore) => {
        const loginPage = getStore().login.toJS()
        const {href, hiddenInputs} = loginPage.form

        hiddenInputs.forEach((input) => {
            formValues[input.name] = input.value
        })

        const options = {
            method: 'POST',
            body: formEncode(formValues),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        let responseCopy

        return makeRequest(href, options)
                .then((response) => {
                    responseCopy = response.clone()
                    return response.text()
                })
                .then((responseText) => {
                    const $html = $(responseText)
                    if ($html.find('.form-login').length) {
                        const error = {
                            _error: "Username or password is incorrect"
                        }
                        reject(new SubmissionError(error))
                    } else {
                        window.location.href = '/customer/account'
                        resolve(true)
                    }
                })
                .catch((error) => {
                    console.error('Failed to login due to network error.', error)
                    reject({})
                })
    }
}
