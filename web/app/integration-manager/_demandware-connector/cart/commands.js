import {makeDemandwareRequest, storeBasketID, getBasketID} from '../utils'
import {receiveCartContents} from '../../cart/responses'
import {getFirstProductImageByPathKey} from '../../../containers/product-details/selectors'
import {receiveCheckoutData} from '../../checkout/responses'
import {parseBasketContents, getProductHref} from '../parsers'
import {API_END_POINT_URL} from '../constants'
import {STATES} from '../checkout/constants'


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
            storeBasketID(basket_id)
            return basket_id
        })
        /* eslint-enable camelcase */
}

export const getProductImage = (item, currentState) => {
    const productImage = getFirstProductImageByPathKey(getProductHref(item.product_id))(currentState)

    if (productImage) {
        // If we already have images for the item in our state, then just use those
        return Promise.resolve({
            src: productImage,
            alt: item.product_name
        })
    } else {
        // We have no images for the item in our state, fetch images using demandware's API
        return makeDemandwareRequest(`${API_END_POINT_URL}/products/${item.product_id}/images?view_type=large`, {method: 'GET'})
            .then((response) => response.json())
            .then(({image_groups}) => {
                return Promise.resolve({
                    src: image_groups[0].images[0].link,
                    alt: item.product_name
                })
            })
    }
}

export const fetchBasketItemImages = (responseJSON, currentState) => {
    const basketData = parseBasketContents(responseJSON)
    if (basketData.items.length) {
        return Promise.all(basketData.items.map((item) => getProductImage(item, currentState)))
            .then((itemImages) => {
                return {
                    ...basketData,
                    items: basketData.items.map((item, i) => ({...item, product_image: itemImages[i]}))
                }
            })
    }
    return Promise.resolve(basketData)
}


export const getCart = () => (dispatch, getState) => {
    return createBasket()
        .then((basketID) => {
            const options = {
                method: 'GET'
            }
            return makeDemandwareRequest(`${API_END_POINT_URL}/baskets/${basketID}`, options)
                .then((response) => response.json())
                .then((responseJSON) => fetchBasketItemImages(responseJSON, getState()))
                .then((basketData) => dispatch(receiveCartContents(basketData)))
        })
}

export const removeFromCart = (itemId) => (dispatch, getState) => {
    return createBasket()
        .then((basketID) => {
            return makeDemandwareRequest(`${API_END_POINT_URL}/baskets/${basketID}/items/${itemId}`, {method: 'DELETE'})
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error('Unable to remove item')
                })
                .then((responseJSON) => fetchBasketItemImages(responseJSON, getState()))
                .then((basketData) => dispatch(receiveCartContents(basketData)))
        })
}

export const updateItemQuantity = (itemId, itemQuantity) => (dispatch, getState) => {

    return createBasket()
        .then((basketID) => {
            const requestOptions = {
                method: 'PATCH',
                body: JSON.stringify({
                    quantity: itemQuantity
                })
            }
            return makeDemandwareRequest(`${API_END_POINT_URL}/baskets/${basketID}/items/${itemId}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Unable to update item')
            })
            .then((responseJSON) => fetchBasketItemImages(responseJSON, getState()))
            .then((basketData) => dispatch(receiveCartContents(basketData)))
        })
}

export const fetchCartPageData = () => (dispatch) => {
    return dispatch(getCart())
        .then(() => {
            return dispatch(receiveCheckoutData({
                locations: {
                    countries: [{value: 'us', label: 'United States'}],
                    regions: STATES
                }
            }))
        })
}
