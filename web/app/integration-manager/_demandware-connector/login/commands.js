import {noop} from 'progressive-web-sdk/dist/utils/utils'
import {setRegisterLoaded, setSigninLoaded} from '../../login/responses'
import {setLoggedIn} from '../../responses'
import {initDemandwareSession, storeAuthToken, makeDemandwareRequest, deleteBasketID} from '../utils'
import {getCart} from '../cart/commands'
import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {SubmissionError} from 'redux-form'

import {API_END_POINT_URL, REQUEST_HEADERS} from '../constants'

const fetchLoginData = () => (dispatch) => {
    dispatch(setSigninLoaded())
    dispatch(setRegisterLoaded())
    return Promise.resolve()
}

export const fetchSigninData = fetchLoginData
export const fetchRegisterData = fetchLoginData

export const navigateToSection = () => (dispatch) => noop()

export const login = ({login}) => (dispatch) => {

    const authorizationData = window.btoa(`${login.username}:${login.password}`)
    const requestOptions = {
        method: 'POST',
        body: '{type: "credentials"}',
        headers: {
            ...REQUEST_HEADERS,
            Authorization: `Basic ${authorizationData}`
        }
    }
    let responseHeaders
    return makeRequest(`${API_END_POINT_URL}/customers/auth`, requestOptions)
        .then((response) => {
            responseHeaders = response.headers
            return response.json()
        })
        .then((responseJSON) => {
            if (responseJSON.fault) {
                throw new SubmissionError({_error: 'Username or password is incorrect'})
            }
            const authorization = responseHeaders.get('Authorization')
            storeAuthToken(authorization)
            dispatch(setLoggedIn(true))
            return initDemandwareSession(authorization)
                .then(() => {
                    deleteBasketID()
                    return dispatch(getCart())
                })
                .then(() => {
                    // Navigate to the homepage, since we haven't made an account page yet
                    // and demandware's account page is at the same URL as their login page
                    return '/on/demandware.store/Sites-2017refresh-Site/default/Home-Show'
                })
        })
}

export const registerUser = ({firstname, lastname, email, password}) => (dispatch) => {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            password,
            customer: {
                first_name: firstname,
                last_name: lastname,
                login: email,
                email
            }
        })
    }
    return makeDemandwareRequest(`${API_END_POINT_URL}/customers`, requestOptions)
        .then((response) => response.json())
        .then((responseJSON) => {
            if (responseJSON.fault) {
                throw new SubmissionError({_error: 'Unable to create account.'})
            }
            // Creating a user doesn't sign them in automatically, so dispatch the login command
            return dispatch(login({login: {username: email, password}}))
        })

}
