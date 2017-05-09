// import {browserHistory} from 'progressive-web-sdk/dist/routing'
import {receiveProductDetailsProductData, receiveProductDetailsUIData} from '../../products/results'
import {setCurrentURL} from '../../results'
import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {makeDemandwareRequest} from '../utils'
import {parseProductDetails, getCurrentProductID, getProductHref} from '../parsers'
import {API_END_POINT_URL} from '../constants'

export const fetchPdpData = (url) => (dispatch) => {
    const productID = getCurrentProductID(url)

    const productURL = `${API_END_POINT_URL}/products/${productID}?expand=prices,images,variations`
    const productPathKey = urlToPathKey(url)
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
            const current = getProductHref(id)

            dispatch(setCurrentURL(current))
            dispatch(fetchPdpData(current))

            return
        }
    }
}
