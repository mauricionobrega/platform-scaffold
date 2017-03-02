import {makeRequest, urlToPathKey} from '../../utils/utils'
import {receivePdpProductData, receivePdpUIData} from '../responses'
import {parseProductDetails} from './parser'

const SITE_ID = 'Sites-2017refresh-Site'
const API_TYPE = 'shop'
const API_VERSION = 'v17_2'
const DW_CLIENT_ID = '5640cc6b-f5e9-466e-9134-9853e9f9db93'

const API_END_POINT_URL = `/s/${SITE_ID}/dw/${API_TYPE}/${API_VERSION}`

const REQUEST_OPTIONS = {
    headers: new Headers({
        'Content-Type': 'application/json',
        'x-dw-client-id': DW_CLIENT_ID
    }),
    body: '{ type : "session" }'
}

const initDemandWareSession = () => {
    const options = {...REQUEST_OPTIONS, method: 'POST'}
    return makeRequest(`${API_END_POINT_URL}/customers/auth`, options)
        .then((response) => {
            REQUEST_OPTIONS.headers.set('Authorization', response.headers.get('Authorization'))
        })
        .then(() => {
            makeRequest(`${API_END_POINT_URL}/sessions`, options)

        })
}

export const fetchPdpData = () => (dispatch) => {
    const productURL = `${API_END_POINT_URL}/products/25564896?expand=prices,images`
    const productPathKey = urlToPathKey(window.location.href)
    return initDemandWareSession()
        .then(() => {
            const options = {
                ...REQUEST_OPTIONS,
                method: 'GET',
                body: undefined
            }
            makeRequest(productURL, options)
                .then((response) => response.json())
                .then((responseJSON) => {
                    dispatch(receivePdpProductData({[productPathKey]: parseProductDetails(responseJSON)}))
                    dispatch(receivePdpUIData({[productPathKey]: {itemQuantity: responseJSON.step_quantity}}))
                })
        })

}

export const addToCart = () => {
    console.log('Add item to cart')
}

export const fetchCheckoutShippingData = () => {
    console.log('Fetch checkout shipping data')
}

export const submitShipping = () => {
    console.log('submit shipping form')
}

export const checkCustomerEmail = () => {
    console.log('Check customer email')
}

export const submitSignIn = () => {
    console.log('Submit sign in form')
}
