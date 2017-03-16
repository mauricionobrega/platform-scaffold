import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {receiveCartContents} from '../../cart/responses'
import {parseBasketContents} from '../parser'
import {initDemandWareSession} from '../app/commands'
import {API_END_POINT_URL} from '../constants'

const storeBasketID = (repsonseJSON) => {
    const basketID = responseJSON.basket_id

    document.cookie = `mob-basket=${basketID}`
    return basketID
}

export const getBasketID = (requestHeaders) => {
    const basketMatch = /mob-basket=([^;]+);/.exec(document.cookie)
    if (basketMatch) {
        return new Promise((resolve) => {
            resolve(basketMatch[1])
        })
    }
    const options = {
        method: 'POST',
    }

    if (requestHeaders) {
        return makeRequest(`${API_END_POINT_URL}/baskets`, {...options, headers: requestHeaders})
            .then((response) => response.json())
            .then(storeBasketID)
    }

    return initDemandWareSession()
        .then((requestHeaders) => {
            makeRequest(`${API_END_POINT_URL}/baskets`, {...options, headers: requestHeaders})
                .then((response) => response.json())
                .then(storeBasketID)
        })
}


export const getCart = () => (dispatch) => {
    return getBasketID()
        .then((basketID) => {
            const options = {
                method: 'GET',
                headers: requestHeaders
            }
            return makeRequest(`${API_END_POINT_URL}/baskets/${basketID}`, options)
                .then((response) => response.json())
                .then((responseJSON) => {
                    dispatch(receiveCartContents(parseBasketContents(responseJSON)))
                })
        })
}
