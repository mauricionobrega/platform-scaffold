/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction, getCookieValue, urlToPathKey} from '../../utils/utils'
import {generateFormKeyCookie} from '../../utils/magento-utils'
import {makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {browserHistory} from 'progressive-web-sdk/dist/routing'

import {getCart} from '../../store/cart/actions'
import * as selectors from './selectors'
import * as appSelectors from '../app/selectors'
import {openModal, closeModal} from '../../store/modals/actions'
import {PRODUCT_DETAILS_ITEM_ADDED_MODAL} from './constants'
import productDetailsParser from './parsers/product-details'

import {isRunningInAstro, trigger} from '../../utils/astro-integration'

export const receiveNewItemQuantity = createAction('Set item quantity')
export const setItemQuantity = (quantity) => (dispatch, getStore) => {
    dispatch(receiveNewItemQuantity({
        [appSelectors.getCurrentPathKey(getStore())]: {
            itemQuantity: quantity
        }
    }))
}

export const addToCartStarted = createAction('Add to cart started')
export const addToCartComplete = createAction('Add to cart complete')

export const receiveData = createAction('Receive Product Details data')
export const process = ({payload}) => {
    const {$, $response, url} = payload
    const parsed = productDetailsParser($, $response)
    return receiveData({[urlToPathKey(url)]: parsed})
}

export const goToCheckout = () => (dispatch) => {
    dispatch(closeModal(PRODUCT_DETAILS_ITEM_ADDED_MODAL))
    if (isRunningInAstro) {
        // If we're running in Astro, we want to dismiss open the cart modal,
        // otherwise, navigating is taken care of by the button press
        trigger('open:cart-modal')
    } else {
        browserHistory.push('/checkout/cart/')
    }
}

export const submitCartForm = () => (dispatch, getStore) => {
    const formInfo = selectors.getFormInfo(getStore())
    const qty = selectors.getItemQuantity(getStore())
    dispatch(addToCartStarted())

    return makeFormEncodedRequest(formInfo.get('submitUrl'), {
        ...formInfo.get('hiddenInputs').toJS(),
        qty,
        form_key: getCookieValue('form_key') || generateFormKeyCookie()
    }, {
        method: formInfo.get('method')
    }).then(() => {
        dispatch(addToCartComplete())
        dispatch(openModal(PRODUCT_DETAILS_ITEM_ADDED_MODAL))
        dispatch(getCart())
    })
}
