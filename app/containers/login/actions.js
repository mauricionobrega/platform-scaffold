import {createAction, makeRequest, formEncode} from '../../utils/utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {onPageReceived} from '../app/actions'

export const submitForm = (formValues, form, success, failure) => {
    return (dispatch, getStore) => {
        const {href, hiddenInputs} = form

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
                    dispatch(failure(responseCopy))
                } else {
                    dispatch(success(responseCopy))
                }
            })
            .catch((error) => {
                console.error('Failed to login due to network error.', error)
            })
    }
}

export const submitLogin = (formValues) => {
    return (dispatch, getStore) => {
        const loginPage = getStore().login.toJS()
        dispatch(submitForm(formValues, loginPage.login.form, loginSuccess, loginFailure))

    }
}

export const submitRegister = (formValues) => {
    return (dispatch, getStore) => {
        const loginPage = getStore().login.toJS()
        dispatch(submitForm(formValues, loginPage.register.form, registerSuccess, registerFailure))
    }
}

export const loginSuccess = (response) => {
    return (dispatch, getStore) => {
        window.location.href = '/customer/account'
    }
}

export const loginFailure = (response) => {
    return (dispatch, getStore) => {
        return jqueryResponse(response)
            .then(([$, $responseText]) => dispatch(onPageReceived($, $responseText))) //TODO: parse error
    }
}

export const registerSuccess = (response) => {
    return (dispatch, getStore) => {
    }
}

export const registerFailure = (response) => {
    return (dispatch, getStore) => {
    }
}
