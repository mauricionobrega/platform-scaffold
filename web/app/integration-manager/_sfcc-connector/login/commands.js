import {noop} from 'progressive-web-sdk/dist/utils/utils'
import {setRegisterLoaded, setSigninLoaded} from '../../login/results'
import {setLoggedIn} from '../../results'
import {initSfccSession, storeAuthToken, makeSfccRequest, deleteBasketID, storeBasketID} from '../utils'
import {requestCartData, createBasket, handleCartData} from '../cart/utils'
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
                let errorMessage = 'Username or password is incorrect'
                if (/internal server/i.test(responseJSON.fault.message)) {
                    errorMessage = 'There was a problem logging in. Please try again.'
                }
                throw new SubmissionError({_error: errorMessage})
            }
            const authorization = responseHeaders.get('Authorization')
            customerID = responseJSON.customer_id
            storeAuthToken(authorization)
            dispatch(setLoggedIn(true))
            deleteBasketID()
            return initSfccSession(authorization)
        })
        // Check if the user has a basket already
        .then(() => makeSfccRequest(`${API_END_POINT_URL}/customers/${customerID}/baskets`), {method: 'GET'})
        .then((response) => response.json())
        .then(({baskets}) => {
            if (baskets.length) {
                if (!basketContents.product_items) {
                    // There is no basket to merge, so return the existing one
                    return Promise.resolve(baskets[0])
                }
                // update basket with contents (product_items)
                const requestOptions = {
                    method: 'POST',
                    body: JSON.stringify(basketContents.product_items)
                }
                const basketID = baskets[0].basket_id
                storeBasketID(basketID)
                return makeSfccRequest(`${API_END_POINT_URL}/baskets/${basketID}/items`, requestOptions)
                    .then((response) => response.json())
            }
            return createBasket(basketContents)

        })
        .then((responseJSON) => dispatch(handleCartData(responseJSON)))
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
    return makeSfccRequest(`${API_END_POINT_URL}/customers`, requestOptions)
        .then((response) => response.json())
        .then((responseJSON) => {
            if (responseJSON.fault) {
                throw new SubmissionError({_error: 'Unable to create account.'})
            }
            // Creating a user doesn't sign them in automatically, so dispatch the login command
            return dispatch(login({login: {username: email, password}}))
        })

}
