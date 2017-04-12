import {makeDemandwareRequest, getBasketID, storeBasketID} from '../utils'
import {receiveCartContents} from '../../cart/responses'
import {getProductThumbnailSrcByPathKey} from '../../../containers/product-details/selectors'
import {parseBasketContents, getProductHref} from '../parsers'
import {API_END_POINT_URL} from '../constants'

export const createBasket = (basketContents) => {
    const basketID = getBasketID()
    if (basketID && !basketContents) {
        return Promise.resolve(basketID)
    }
    const options = {
        method: 'POST'
    }
    if (basketContents) {
        options.body = JSON.stringify(basketContents)
    }

    return makeDemandwareRequest(`${API_END_POINT_URL}/baskets`, options)
        .then((response) => response.json())
        .then((basket) => {
            storeBasketID(basket.basket_id)
            if (basketContents) {
                return basket
            }

            return basket.basket_id
        })
}

export const getProductImage = (item, currentState) => {
    const productImage = getProductThumbnailSrcByPathKey(getProductHref(item.product_id))(currentState)

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

export const parseAndReceiveCartResponse = (responseJSON) => (dispatch, getState) => {
    return fetchBasketItemImages(responseJSON, getState())
        .then((basketData) => dispatch(receiveCartContents(basketData)))
}

export const requestCartData = () => {
    return createBasket()
        .then((basketID) => {
            const options = {
                method: 'GET'
            }
            return makeDemandwareRequest(`${API_END_POINT_URL}/baskets/${basketID}`, options)
        })
}
