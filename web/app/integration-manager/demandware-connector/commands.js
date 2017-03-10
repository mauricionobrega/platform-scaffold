import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {urlToPathKey} from '../../utils/utils'
import {receiveCartContents} from '../../store/cart/actions'
import * as responses from '../responses'
import {browserHistory} from 'react-router'
import {parseProductDetails, parseBasketContents, parseProductListData, getProductHref} from './parser'

const SITE_ID = 'Sites-2017refresh-Site'
const API_TYPE = 'shop'
const API_VERSION = 'v17_2'
const DW_CLIENT_ID = '5640cc6b-f5e9-466e-9134-9853e9f9db93'
const API_END_POINT_URL = `/s/${SITE_ID}/dw/${API_TYPE}/${API_VERSION}`
const REQUEST_HEADERS = {
    'Content-Type': 'application/json',
    'x-dw-client-id': DW_CLIENT_ID
}

const initDemandWareSession = () => {
    const options = {
        method: 'POST',
        body: '{ type : "session" }',
        headers: new Headers(REQUEST_HEADERS)
    }
    return makeRequest(`${API_END_POINT_URL}/customers/auth`, options)
        .then((response) => {
            // To Do: Add this to the store???
            REQUEST_HEADERS.Authorization = response.headers.get('Authorization')
            options.headers.set('Authorization', response.headers.get('Authorization'))
        })
        .then(() => {
            makeRequest(`${API_END_POINT_URL}/sessions`, options)

        })
}

const createNewBasket = () => {
    const options = {
        method: 'POST',
        headers: new Headers(REQUEST_HEADERS)
    }
    return makeRequest(`${API_END_POINT_URL}/baskets`, options)
        .then((response) => response.json())
        .then((responseJSON) => {
            const basketID = responseJSON.basket_id

            document.cookie = `mob-basket=${basketID}`
            return basketID
        })
}

const getBasketID = () => {
    const basketMatch = /mob-basket=([^;]+);/.exec(document.cookie)
    if (basketMatch) {
        return new Promise((resolve) => {
            resolve(basketMatch[1])
        })
    }
    return createNewBasket()
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
            return dispatch(responses.receiveNavigationData({
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
            dispatch(responses.receiveHomeData({banners: [{}, {}, {}]}))
        })
}

export const fetchPdpData = () => (dispatch) => {
    const productURL = `${API_END_POINT_URL}/products/${getCurrentProductID()}?expand=prices,images,variations`
    const productPathKey = urlToPathKey(window.location.href)
    return initDemandWareSession()
        .then(() => {
            const options = {
                method: 'GET',
                headers: new Headers(REQUEST_HEADERS)
            }
            makeRequest(productURL, options)
                .then((response) => response.json())
                .then((responseJSON) => {
                    const productDetailsData = parseProductDetails(responseJSON)
                    productDetailsData.availableVariations.forEach(({variationID}) => {
                        dispatch(responses.receivePdpProductData({[getProductHref(variationID)]: productDetailsData}))
                    })
                    dispatch(responses.receivePdpProductData({[productPathKey]: productDetailsData}))
                    dispatch(responses.receivePdpUIData({[productPathKey]: {itemQuantity: responseJSON.step_quantity, ctaText: 'Add To Cart'}}))
                })
        })
        .then(() => {
            return getBasketID()
                .then((basketID) => {
                    const options = {
                        method: 'GET',
                        headers: new Headers(REQUEST_HEADERS)
                    }
                    return makeRequest(`${API_END_POINT_URL}/baskets/${basketID}`, options)
                })
                .then((response) => response.json())
                .then((responseJSON) => {
                    dispatch(receiveCartContents(parseBasketContents(responseJSON)))
                })
        })

}

export const fetchProductListData = (url) => (dispatch) => {
    const categoryIDMatch = /\/([^/]+)$/.exec(url)
    const categoryID = categoryIDMatch ? categoryIDMatch[1] : ''
    const urlPathKey = urlToPathKey(url)

    return initDemandWareSession()
        .then(() => {
            const options = {
                method: 'GET',
                headers: new Headers(REQUEST_HEADERS)
            }
            makeRequest(`${API_END_POINT_URL}/categories/${categoryID}`, options)
                .then((response) => response.json())
                .then((responseJSON) => {
                    dispatch(responses.receiveCategory({
                        // TODO: figure out breadcrumb
                        [urlPathKey]: {title: responseJSON.name}
                    }))
                    if (responseJSON.parent_category_id !== 'root') {
                        makeRequest(`${API_END_POINT_URL}/categories/${responseJSON.parent_category_id}`, options)
                            .then((response) => response.json())
                            .then((responseJSON) => {
                                dispatch(responses.receiveCategory({
                                    [urlPathKey]: {parentName: responseJSON.name, parentHref: `/s/${SITE_ID}/${responseJSON.id}`}
                                }))
                            })
                    }
                })
                .then(() => {
                    makeRequest(`${API_END_POINT_URL}/product_search?expand=images,prices&q=&refine_1=cgid=${categoryID}`, options)
                        .then((response) => response.json())
                        .then(({hits}) => {
                            const productListData = parseProductListData(hits)
                            const categoryData = {
                                products: Object.keys(productListData)
                            }

                            dispatch(responses.receiveProductListProductData(productListData))
                            dispatch(responses.receiveCategory({
                                [urlPathKey]: categoryData
                            }))
                        })
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

export const addToCart = () => (dispatch) => {
    return initDemandWareSession()
        .then(() => {

            const options = {
                method: 'POST',
                headers: new Headers(REQUEST_HEADERS),
                body: `[{product_id: "${getCurrentProductID()}" , quantity: 1.00}]`
            }

            return getBasketID()
                .then((basketID) => {
                    // TO DO: Add error handling here
                    makeRequest(`${API_END_POINT_URL}/baskets/${basketID}/items`, options)
                        .then((response) => {
                            if (response.ok) {
                                return response.json()
                            }
                            createNewBasket()
                            dispatch(addToCart())
                            throw new Error('Unable to add item to cart')
                        })
                        .then((responseJSON) => {
                            dispatch(receiveCartContents(parseBasketContents(responseJSON)))
                            dispatch(responses.onAddToCartSucceess())
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                })




            // TO DO: Check for existing Basket id before creating one
            // return makeRequest(`${API_END_POINT_URL}/baskets`, options)
            //     .then((response) => response.json())
            //     .then((responseJSON) => {
            //         const basketID = responseJSON.basket_id
            //         options.body = '[{product_id: "701643427208", quantity: 1.00}]'
            //
            //         // TO DO: Add error handling here
            //         makeRequest(`${API_END_POINT_URL}/baskets/${basketID}/items`, options)
            //             .then((response) => {
            //                 if (response.ok) {
            //                     return response.json()
            //                 }
            //                 throw new Error('Unable to add item to cart')
            //             })
            //             .then((responseJSON) => {
            //                 // Add content to cart prop
            //                 const items = responseJSON.product_items.map(({product_name, price, product_id}) => {
            //                     return {
            //                         product_name,
            //                         product_price: price,
            //                         product_url: `${API_END_POINT_URL}${product_id}.html`,
            //                         product_image: {}
            //                     }
            //                 })
            //                 dispatch(receiveCartContents({items, summary_count: items.length}))
            //                 dispatch(onAddToCartSucceess())
            //             })
            //             .catch((error) => {
            //                 console.log(error)
            //             })
            //     })
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
