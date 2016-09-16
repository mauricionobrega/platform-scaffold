import {SubmissionError} from 'redux-form'

const loginUrl = 'http://www.merlinspotions.com/customer/account/loginPost/'

export const attemptLogin = (formData) => {
    const postBody = $('form').serialize()

    // Returning a promise from onSubmit helps Redux-Form determine when
    // the form is finished submitting
    return fetch(loginUrl, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Cookie: `${document.cookie}; form_key=${formData.form_key}`,
        },
        body: postBody
    }).then((response) => {
        if (response.status === 200 && response.url !== window.location.href) {
            window.location.href = response.url
        } else {
            throw new SubmissionError({'login[username]': '', _error: 'Username and/or password was incorrect'})
        }
    })
}
