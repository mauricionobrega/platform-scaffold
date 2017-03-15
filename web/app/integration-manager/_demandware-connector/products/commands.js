import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {receiveProductDetailsProductData, receiveProductDetailsUIData} from '../../products/responses'
import {receiveCartContents} from '../../../store/cart/actions'
import {urlToPathKey} from '../../../utils/utils'
import {requestHeaders, initDemandWareSession, getBasketID} from '../app/commands'
import {parseProductDetails, getCurrentProductID, parseBasketContents, getProductHref} from '../parsers'
import {API_END_POINT_URL} from '../constants'

export const fetchPdpData = () => (dispatch) => {
    const productURL = `${API_END_POINT_URL}/products/${getCurrentProductID()}?expand=prices,images`
    const productPathKey = urlToPathKey(window.location.href)
    return initDemandWareSession()
        .then(() => {
            const options = {
                method: 'GET',
                headers: requestHeaders
            }
            return makeRequest(productURL, options)
                .then((response) => response.json())
                .then((responseJSON) => {
                    const productDetailsData = parseProductDetails(responseJSON)
                    productDetailsData.availableVariations.forEach(({variationID}) => {
                        dispatch(receiveProductDetailsProductData({[getProductHref(variationID)]: productDetailsData}))
                    })
                    dispatch(receiveProductDetailsProductData({[productPathKey]: productDetailsData}))
                    dispatch(receiveProductDetailsUIData({[productPathKey]: {itemQuantity: responseJSON.step_quantity, ctaText: 'Add To Cart'}}))
                })
        })
        .then(getBasketID)
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

export const getProductVariationData = (variationSelections, availableVariations) => (dispatch) => {
    if (variationSelections.color && variationSelections.size) {
        // TODO: ^^ don't hard code this check, use the state instead?
        const selectedVariationData = availableVariations.filter(({variationValues: {color, size}}) => {
            return color === variationSelections.color && size === variationSelections.size
        })[0]
        if (selectedVariationData) {
            browserHistory.push({
                pathname: getProductHref(selectedVariationData.variationID)
            })
        }
    }
}
