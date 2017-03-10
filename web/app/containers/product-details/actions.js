import {createAction, urlToPathKey} from '../../utils/utils'
import {browserHistory} from 'react-router'
import * as selectors from './selectors'
import * as appSelectors from '../app/selectors'
import {getFormValues} from '../../store/form/selectors'
import productDetailsParser from './parsers/product-details'

import * as commands from '../../integration-manager/commands'
import {closeModal} from '../../store/modals/actions'
import {PRODUCT_DETAILS_ITEM_ADDED_MODAL} from './constants'

import {isRunningInAstro} from '../../utils/astro-integration'
import Astro from '../../vendor/astro-client'

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
        Astro.trigger('open:cart-modal')
    } else {
        browserHistory.push('/checkout/')
    }
}

export const submitCartForm = () => (dispatch, getStore) => {
    const key = appSelectors.getCurrentPathKey(getStore())
    const qty = selectors.getItemQuantity(getStore())
    dispatch(addToCartStarted())
    return dispatch(commands.addToCart(key, qty))
}

export const onVariationBlur = () => (dispatch, getStore) => {
    const currentState = getStore()
    const variationSelections = getFormValues('product-add-to-cart')(currentState)
    const availableVariations = selectors.getProductVariations(currentState).toJS()
    dispatch(commands.getProductVariationData(variationSelections, availableVariations))
}
