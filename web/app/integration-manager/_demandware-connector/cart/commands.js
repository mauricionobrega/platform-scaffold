import {makeDemandwareRequest, storeBasketID, getBasketID} from '../utils'
import {receiveCartContents} from '../../cart/responses'
import {parseBasketContents} from '../parsers'
import {API_END_POINT_URL} from '../constants'


export const createBasket = () => {
    const basketID = getBasketID()
    if (basketID) {
        return Promise.resolve(basketID)
    }
    const options = {
        method: 'POST'
    }

    return makeDemandwareRequest(`${API_END_POINT_URL}/baskets`, options)
        .then((response) => response.json())

        /* eslint-disable camelcase */
        .then(({basket_id}) => {
            const basketID = basket_id
            storeBasketID(basketID)
            return basketID
        })
        /* eslint-enable camelcase */
}


export const getCart = () => (dispatch) => {
    return createBasket()
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
