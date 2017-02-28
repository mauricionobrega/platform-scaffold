import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'

import {makeRequest, urlToPathKey, makeFormEncodedRequest} from '../../utils/utils'
import {makeJsonEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'

import {productDetailsParser} from '../../store/products/parser'
import {pdpAddToCartFormParser} from './parsers'
import {checkoutShippingParser, parseCheckoutData} from './checkout/parsers'
import {receivePdpProductData, receiveCheckoutShippingData, receiveCheckoutData} from './../responses'
import {getCustomerEntityID} from '../../store/checkout/selectors'
import {getIsLoggedIn} from '../../containers/app/selectors'
import {getShippingFormValues} from '../../store/form/selectors'
import {browserHistory} from 'react-router'
import {receiveFormInfo} from './../actions'

export const fetchPdpData = (url) => (dispatch) => {
    return makeRequest(url)
        .then(jqueryResponse)
        .then((res) => {
            const [$, $response] = res
            dispatch(receivePdpProductData({[urlToPathKey(url)]: productDetailsParser($, $response)}))
            dispatch(receiveFormInfo({[urlToPathKey(url)]: pdpAddToCartFormParser($, $response).formInfo}))
        })
        .catch((error) => { console.info(error.message) })
}

export const addToCart = (key, qty) => (dispatch, getStore) => {
    const formInfo = getStore().integrationManager.get(key)

    return makeFormEncodedRequest(formInfo.get('submitUrl'), {
        ...formInfo.get('hiddenInputs').toJS(),
        qty
    }, {
        method: formInfo.get('method')
    })
}

export const fetchCheckoutShippingData = (url) => (dispatch) => {
    return makeRequest(url)
        .then(jqueryResponse)
        .then(([$, $response]) => {

            dispatch(receiveCheckoutShippingData(checkoutShippingParser($, $response)))
            dispatch(receiveCheckoutData(parseCheckoutData($response)))
        })
        .catch((error) => { console.info(error.message) })
}

export const submitShipping = () => {
    return (dispatch, getState) => {
        const currentState = getState()
        const {
            name,
            company,
            addressLine1,
            addressLine2,
            country_id,
            city,
            username,
            region_id,
            region,
            postcode,
            telephone,
            shipping_method
        } = getShippingFormValues(currentState)
        const entityID = getCustomerEntityID(currentState)
        const isLoggedIn = getIsLoggedIn(currentState)
        const names = name.split(' ')
        const shippingSelections = shipping_method.split('_')
        const address = {
            firstname: names.slice(0, -1).join(' '),
            lastname: names.slice(-1).join(' '),
            company: company || '',
            telephone,
            postcode,
            city,
            street: addressLine2 ? [addressLine1, addressLine2] : [addressLine1],
            regionId: region_id,
            region,
            countryId: country_id,
            save_in_address_book: true
        }
        const addressInformation = {
            addressInformation: {
                shippingAddress: address,
                billingAddress: {
                    ...address,
                    saveInAddressBook: false
                },
                shipping_carrier_code: shippingSelections[0],
                shipping_method_code: shippingSelections[1]
            }
        }
        const persistShippingURL = `https://www.merlinspotions.com/rest/default/V1/${isLoggedIn ? 'carts/mine' : `guest-carts/${entityID}`}/shipping-information`
        dispatch(receiveCheckoutData({shipping: {address}, emailAddress: username}))
        makeJsonEncodedRequest(persistShippingURL, addressInformation, {method: 'POST'})
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON.payment_methods) {
                    // TO DO: send response data to the next container
                    browserHistory.push({
                        pathname: '/checkout/payment/'
                    })
                }
            })
    }
}
