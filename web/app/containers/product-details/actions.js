import {browserHistory} from 'progressive-web-sdk/dist/routing'
import {createAction} from '../../utils/utils'
import {SubmissionError} from 'redux-form'

import * as selectors from './selectors'
import * as appSelectors from '../app/selectors'
import {getFormValues} from '../../store/form/selectors'

import {addToCart, getProductVariationData} from '../../integration-manager/commands'
import {openModal, closeModal} from '../../store/modals/actions'
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


export const submitCartForm = (formValues) => (dispatch, getStore) => {
    const currentState = getStore()
    const key = appSelectors.getCurrentPathKey(currentState)
    const qty = selectors.getItemQuantity(currentState)
    const variations = selectors.getVariationOptions(currentState)
    dispatch(addToCartStarted())

    return new Promise((resolve, reject) => {
        const errors = {}
        if (variations) {
            variations.toJS().forEach(({id, name}) => {
                if (!formValues[id]) {
                    errors[id] = `Please select a ${name}.`
                }
            })
        }
        if (Object.keys(errors).length) {
            return reject(new SubmissionError(errors))
        }
        return resolve(true)
    })
    .then(() => dispatch(addToCart(key, qty)))
    .then(() => dispatch(openModal(PRODUCT_DETAILS_ITEM_ADDED_MODAL)))
    .catch((error) => {
        // TODO?? How do we communicate errors to the user?? Modal?
        console.error(`Error adding to cart: ${error}`)
    })
    .then(() => dispatch(addToCartComplete()))

}

export const onVariationBlur = () => (dispatch, getStore) => {
    const currentState = getStore()
    const variationSelections = getFormValues('product-add-to-cart')(currentState)
    const availableVariations = selectors.getProductVariations(currentState).toJS()
    return dispatch(getProductVariationData(variationSelections, availableVariations))
}
