import {makeDemandwareRequest, getBasketID, storeBasketID, deleteBasketID} from '../utils'
import {getCartItems} from '../../../store/cart/selectors'
import {receiveCartProductData} from '../../products/responses'

import {getProductThumbnailSrcByPathKey, getProductThumbnailByPathKey} from '../../../store/products/selectors'
import {getProductHref} from '../parsers'
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

/**
 * Fetches thumbnail images for products that are in the cart and don't already
 * have a thumbnail.
 */
export const fetchCartItemThumbnails = () => (dispatch, getState) => {
    const currentState = getState()
    const items = getCartItems(currentState)
    const updatedProducts = {}

    return Promise.all(items.filter((cartItem) => getProductThumbnailByPathKey(getProductHref(cartItem.get('productId')))(currentState).size === 0)
        .map((cartItem) => {
            const productId = cartItem.get('productId')

            // We don't have a thumbnail for this product, fetch using SFCC's API
            const viewType = 'medium' // view_type: https://documentation.demandware.com/DOC2/index.jsp?topic=%2Fcom.demandware.dochelp%2FImageManagement%2FUnderstandingViewtypes.html
            return makeDemandwareRequest(`${API_END_POINT_URL}/products/${[productId]}/images?view_type=${viewType}`, {method: 'GET'})
                .then((response) => response.json())
                .then(({image_groups, short_description}) => {
                    updatedProducts[getProductHref(productId)] = {
                        /* Product */
                        id: productId,
                        thumbnail: {
                            /* Image */
                            src: image_groups[0].images[0].link,
                            alt: short_description,
                            caption: image_groups[0].images[0].title
                        }
                    }
                })
        })
    )
    .then(() => {
        dispatch(receiveCartProductData(updatedProducts))
    })
}

export const requestCartData = (noRetry) => {
    return createBasket()
        .then((basketID) => makeDemandwareRequest(`${API_END_POINT_URL}/baskets/${basketID}`, {method: 'GET'}))
        .then((response) => {
            if (response.status === 404) {
                if (noRetry) {
                    throw new Error('Cart not found')
                }
                // Our basket has expired, clear and start over
                deleteBasketID()
                return requestCartData(true)
            }
            return response
        })
}
