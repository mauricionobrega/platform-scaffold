import {makeDemandwareRequest, storeBasketID, getBasketID} from '../utils'
import {receiveCartContents} from '../../cart/responses'
import {parseBasketContents} from '../parsers'
import {API_END_POINT_URL} from '../constants'


export const getBasketID = () => {
    const basketID = getBasketID()
    if (basketID) {
        return Promise.resolve(basketID)
    }
    const options = {
        method: 'POST'
    }

    return makeDemandwareRequest(`${API_END_POINT_URL}/baskets`, options)
        .then((response) => response.json())
        .then((responseJSON) => {
            const basketID = responseJSON.basket_id

            storeBasketID(basketID)
            return basketID
        })
}


export const getCart = () => (dispatch) => {
    return getBasketID()
        .then((basketID) => {
            const options = {
                method: 'GET'
            }
            return makeDemandwareRequest(`${API_END_POINT_URL}/baskets/${basketID}`, options)
                .then((response) => response.json())
                .then((responseJSON) => {
                    dispatch(receiveCartContents(parseBasketContents(responseJSON)))
                })
        })
}
