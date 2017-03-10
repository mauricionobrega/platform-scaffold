import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {urlToPathKey} from '../../utils/utils'
import {receiveCartContents} from '../../store/cart/actions'
import {receivePdpProductData, receivePdpUIData, onAddToCartSucceess, receiveHomeData, receiveNavigationData} from '../responses'
import {parseProductDetails, parseBasketContents} from './parser'

const SITE_ID = 'Sites-2017refresh-Site'
const API_TYPE = 'shop'
const API_VERSION = 'v17_2'
const DW_CLIENT_ID = '5640cc6b-f5e9-466e-9134-9853e9f9db93'
const API_END_POINT_URL = `/s/${SITE_ID}/dw/${API_TYPE}/${API_VERSION}`
const requestHeaders = {
    'Content-Type': 'application/json',
    'x-dw-client-id': DW_CLIENT_ID
}

const initDemandWareSession = () => {
    const options = {
        method: 'POST',
        body: '{ type : "session" }',
        headers: requestHeaders
    }
    return makeRequest(`${API_END_POINT_URL}/customers/auth`, options)
        .then((response) => {
            // To Do: Add this to the store???
            requestHeaders.Authorization = response.headers.get('Authorization')
            options.headers.Authorization = response.headers.get('Authorization')
        })
        .then(() => {
            makeRequest(`${API_END_POINT_URL}/sessions`, options)

        })
}

const getBasketID = () => {
    const basketMatch = /mob-basket=([^;]+);/.exec(document.cookie)
    if (basketMatch) {
        return new Promise((resolve) => {
            resolve(basketMatch[1])
        })
    }
    const options = {
        method: 'POST',
        headers: requestHeaders
    }
    return makeRequest(`${API_END_POINT_URL}/baskets`, options)
        .then((response) => response.json())
        .then((responseJSON) => {
            const basketID = responseJSON.basket_id

            document.cookie = `mob-basket=${basketID}`
            return basketID
        })
}

const getCurrentProductID = () => {
    const productIDMatch = /(\d+).html/.exec(window.location.href)
    return productIDMatch ? productIDMatch[1] : ''
}

const fetchNavigationData = () => (dispatch) => {
    const options = {
        method: 'GET',
        headers: new Headers(REQUEST_HEADERS)
    }
    return makeRequest(`${API_END_POINT_URL}/categories/root?levels=2`, options)
        .then((response) => response.json())
        .then(({categories}) => {
            const navData = categories.map((category) => {
                return {
                    title: category.name,
                    path: `/s/${SITE_ID}/${category.id}`,
                    isCategoryLink: true
                }
            })
            return dispatch(receiveNavigationData({
                path: '/',
                root: {
                    title: 'root',
                    path: '/',
                    children: [
                        {
                            // TODO: Find a way to get this data without hardcoding
                            title: 'Sign In',
                            path: `/on/demandware.store/${SITE_ID}/default/Account-Show`,
                            type: 'AccountNavItem'
                        },
                        ...navData
                    ]
                }
            }))
        })
}

export const fetchHomeData = () => (dispatch) => {
    return initDemandWareSession()
        .then(() => dispatch(fetchNavigationData()))
        .then(() => {
            // TODO: How do we get banner info?
            dispatch(receiveHomeData({banners: [{}, {}, {}]}))
        })
}

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
                    dispatch(receivePdpProductData({[productPathKey]: parseProductDetails(responseJSON)}))
                    dispatch(receivePdpUIData({[productPathKey]: {itemQuantity: responseJSON.step_quantity, ctaText: 'Add To Cart'}}))
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


export const addToCart = () => (dispatch) => {
    return initDemandWareSession()
        .then(getBasketID)
        .then((basketID) => {
            const options = {
                method: 'POST',
                headers: requestHeaders,
                body: `[{product_id: "${getCurrentProductID()}" , quantity: 1.00}]`
            }
            // TO DO: Add error handling here
            return makeRequest(`${API_END_POINT_URL}/baskets/${basketID}/items`, options)
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error('Unable to add item to cart')
                })
                .then((responseJSON) => {
                    dispatch(receiveCartContents(parseBasketContents(responseJSON)))
                    dispatch(onAddToCartSucceess())
                })
                .catch((error) => {
                    console.log(error)
                })
        })
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
