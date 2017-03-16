import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {receiveProductDetailsProductData, receiveProductDetailsUIData} from '../../products/responses'
import {urlToPathKey} from '../../../utils/utils'
import {initDemandWareSession} from '../app/commands'
import {parseProductDetails, getCurrentProductID} from '../parser'
import {API_END_POINT_URL} from '../constants'

export const fetchPdpData = () => (dispatch) => {
    const productURL = `${API_END_POINT_URL}/products/${getCurrentProductID()}?expand=prices,images`
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
                    dispatch(receiveProductDetailsProductData({[productPathKey]: parseProductDetails(responseJSON)}))
                    dispatch(receiveProductDetailsUIData({[productPathKey]: {itemQuantity: responseJSON.step_quantity, ctaText: 'Add To Cart'}}))
                })
        })

}
