import {browserHistory} from 'progressive-web-sdk/dist/routing'
import {receiveProductDetailsProductData, receiveProductDetailsUIData} from '../../products/responses'
import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {makeDemandwareRequest} from '../utils'
import {parseProductDetails, getCurrentProductID, getProductHref} from '../parsers'
import {API_END_POINT_URL} from '../constants'

export const fetchPdpData = () => (dispatch) => {
    const productURL = `${API_END_POINT_URL}/products/${getCurrentProductID()}?expand=prices,images,variations`
    const productPathKey = urlToPathKey(window.location.href)
    const options = {
        method: 'GET'
    }
    return makeDemandwareRequest(productURL, options)
        .then((response) => response.json())
        .then((responseJSON) => {
            const productDetailsData = {
                ...parseProductDetails(responseJSON),
                href: productPathKey
            }
            const productDetailsMap = {
                [productPathKey]: productDetailsData
            }
            productDetailsData.variations.forEach(({id}) => {
                productDetailsMap[getProductHref(id)] = productDetailsData
            })
            dispatch(receiveProductDetailsProductData(productDetailsMap))
            dispatch(receiveProductDetailsUIData({[productPathKey]: {itemQuantity: responseJSON.step_quantity, ctaText: 'Add To Cart'}}))
        })
}

export const getProductVariationData = (variationSelections, availableVariations, variationOptions) => (dispatch) => {
    let isFullySelected = true
    variationOptions.forEach(({id}) => {
        if (!variationSelections[id]) {
            isFullySelected = false
        }
    })

    if (isFullySelected) {
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
