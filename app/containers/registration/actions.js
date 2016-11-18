import {createAction, makeFormEncodedRequest, isEmail} from '../../utils/utils'
import {SubmissionError} from 'redux-form'

const validateForm = (formValues) => {
    const errors = {}

    if (!Object.keys(formValues).length) {
        return {
            _error: 'Please fill in the form'
        }
    }

    const {
        firstname,
        lastname,
        email,
        password,
        password_confirmation: passwordConfirmation
    } = formValues

    if (!firstname) {
        errors.firstname = 'First name is required'
    }

    if (!lastname) {
        errors.lastname = 'Last name is required'
    }

    if (!email) {
        errors.email = 'Email address is required'
    } else if (!isEmail(email)) {
        errors.email = 'Email address is invalid'
    }

    if (!password) {
        errors.password = 'Password is required'
    }

    if (password !== passwordConfirmation) {
        errors.password_confirmation = 'Passwords are not the same'
    }

    return errors
}

export const submitForm = (formValues, resolve, reject) => {
    return (dispatch, getStore) => {
        const errors = validateForm(formValues)
        if (errors._error || Object.keys(errors).length) {
            return reject(new SubmissionError(errors))
        }
        const registrationPage = getStore().registration.toJS()
        const {href, hiddenInputs} = registrationPage.form

        hiddenInputs.forEach((input) => {
            formValues[input.name] = input.value
        })

        return makeFormEncodedRequest(href, formValues, {method: 'POST'})
            .then((response) => {
                return response.text()
            })
            .then((responseText) => {
                const $html = $(responseText)
                if ($html.find('.form-create-account').length) {
                    const error = {
                        _error: 'Username or password is incorrect'
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

export const openInfoModal = createAction('Close Info Sheet')
export const closeInfoModal = createAction('Close Info Sheet')
