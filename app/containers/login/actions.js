import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {createAction} from '../../utils/utils'
import loginParser from './parsers/login'

const loginUrl = 'http://www.merlinspotions.com/customer/account/loginPost/'

export const receiveLoginContents = createAction('Login page contents received')

export const fetchLoginContents = () => {
    return (dispatch) => {
        fetch(window.location.href, {
            credentials: 'same-origin',
        })
        .then((response) => {
            if (response.url !== window.location.href) {
                window.location.href = response.location
                return false
            } else {
                return jqueryResponse(response)
            }
        })
        .then(([$, $response]) => {
            dispatch(receiveLoginContents(loginParser($, $response)))
        })
    }
}

export const attemptLogin = (formData) => {
    return (dispatch) => {
        const postBody = ''
            .concat(`form_key=${formData.form_key}`)
            .concat('&')
            .concat(`login[username]=${encodeURIComponent(formData.login.username)}`)
            .concat('&')
            .concat(`login[password]=${encodeURIComponent(formData.login.password)}`)
            .concat('&')
            .concat(`persistent_remember_me=${formData.persistent_remember_me}`)

        fetch(loginUrl, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': `${document.cookie}; form_key=${formData.form_key}`,
            },
            body: postBody
        }).then((response) => {
            if (response.status === 200) {
                window.location.href = response.url
            }
        })
    }
}
