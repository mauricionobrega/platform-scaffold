import {noop} from 'progressive-web-sdk/dist/utils/utils'
import {setRegisterLoaded, setSigninLoaded} from '../../login/responses'
import {setLoggedIn} from '../../responses'
import {initDemandwareSession, storeAuthToken, makeDemandwareRequest, deleteBasketID} from '../utils'
import {requestCartData, parseAndReceiveCartResponse, createBasket} from '../cart/utils'
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
    let basketContents
    let customerID
    return requestCartData()
        .then((response) => response.json())
        .then((basket) => {
            basketContents = basket
            return makeRequest(`${API_END_POINT_URL}/customers/auth`, requestOptions)
        })
        .then((response) => {
            responseHeaders = response.headers
            return response.json()
        })
        .then((responseJSON) => {
            if (responseJSON.fault) {
                throw new SubmissionError({_error: 'Username or password is incorrect'})
            }
            const authorization = responseHeaders.get('Authorization')
            customerID = responseJSON.customer_id
            storeAuthToken(authorization)
            dispatch(setLoggedIn(true))
            deleteBasketID()
            return initDemandwareSession(authorization)
        })
        // Check if the user has a basket already
        .then(() => makeDemandwareRequest(`${API_END_POINT_URL}/customers/${customerID}/baskets`), {method: 'GET'})
        .then((response) => response.json())
        .then(({baskets}) => {
            if (baskets.length) {
                // update basket with contents (product_items)
                const requestOptions = {
                    method: 'POST',
                    body: JSON.stringify(basketContents.product_items)
                }
                return makeDemandwareRequest(`${API_END_POINT_URL}/baskets/${baskets[0].basket_id}/items`, requestOptions)
                    .then((response) => response.json())
            } else {
                return createBasket(basketContents)
            }
        })
        .then((responseJSON) => dispatch(parseAndReceiveCartResponse(responseJSON)))
        .then(() => {
            // Navigate to the homepage, since we haven't made an account page yet
            // and demandware's account page is at the same URL as their login page
            return '/on/demandware.store/Sites-2017refresh-Site/default/Home-Show'
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
