import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {browserHistory} from 'progressive-web-sdk/dist/routing'
import {receiveProductDetailsProductData, receiveProductDetailsUIData} from '../../products/responses'
import {urlToPathKey} from '../../../utils/utils'
import {initDemandWareSession} from '../app/commands'
import {parseProductDetails, getCurrentProductID, getProductHref} from '../parsers'
import {API_END_POINT_URL} from '../constants'

export const fetchPdpData = () => (dispatch) => {
    const productURL = `${API_END_POINT_URL}/products/${getCurrentProductID()}?expand=prices,images,variations`
    const productPathKey = urlToPathKey(window.location.href)
    return initDemandWareSession()
        .then((headers) => {
            const options = {
                method: 'GET',
                headers
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
