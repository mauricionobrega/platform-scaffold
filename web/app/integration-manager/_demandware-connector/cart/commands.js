import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {receiveCartContents} from '../../cart/responses'
import {parseBasketContents} from '../parsers'
import {API_END_POINT_URL} from '../constants'

const storeBasketID = (responseJSON) => {
    const basketID = responseJSON.basket_id

    document.cookie = `mob-basket=${basketID}`
    return basketID
}

export const getBasketID = (headers) => {
    const basketMatch = /mob-basket=([^;]+);/.exec(document.cookie)
    if (basketMatch) {
        return new Promise((resolve) => {
            resolve(basketMatch[1])
        })
    }
    const options = {
        method: 'POST',
        headers
    }

    return makeRequest(`${API_END_POINT_URL}/baskets`, options)
        .then((response) => response.json())
        .then(storeBasketID)
}


export const getCart = (headers) => (dispatch) => {
    return getBasketID(headers)
        .then((basketID) => {
            const options = {
                method: 'GET',
                headers
            }
            return makeRequest(`${API_END_POINT_URL}/baskets/${basketID}`, options)
                .then((response) => response.json())
                .then((responseJSON) => {
                    dispatch(receiveCartContents(parseBasketContents(responseJSON)))
                })
        })
}
