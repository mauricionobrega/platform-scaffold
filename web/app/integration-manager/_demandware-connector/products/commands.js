import {browserHistory} from 'progressive-web-sdk/dist/routing'
import {receiveProductDetailsProductData, receiveProductDetailsUIData} from '../../products/results'
import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {makeDemandwareRequest} from '../utils'
import {parseProductDetails, getCurrentProductID, getProductHref} from '../parsers'
import {API_END_POINT_URL} from '../constants'

export const fetchPdpData = () => (dispatch) => {
    let productID = getCurrentProductID()
    const varID = window.location.search.match(/varID=(\d+)/)

    if (varID) {
        productID = varID[1]
    }

    const productURL = `${API_END_POINT_URL}/products/${productID}?expand=prices,images,variations`
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
            productDetailsData.variants.forEach(({id}) => {
                productDetailsMap[getProductHref(id)] = productDetailsData
            })
            dispatch(receiveProductDetailsProductData(productDetailsMap))
            dispatch(receiveProductDetailsUIData({[productPathKey]: {itemQuantity: responseJSON.step_quantity}}))
        })
}

export const getProductVariantData = (selections, variants, categoryIds) => (dispatch) => {
    if (categoryIds.some((id) => !selections[id])) {
        return
    }

    for (const {values, id} of variants) {
        if (categoryIds.every((id) => selections[id] === values[id])) {
            let variationID = getProductHref(id).match(/(\d+).html/)[1]

            browserHistory.push({
                pathname: `${window.location.pathname}?varID=${variationID}`
            })
            return
        }
    }
}
