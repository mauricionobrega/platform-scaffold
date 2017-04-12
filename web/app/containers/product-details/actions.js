import {browserHistory} from 'progressive-web-sdk/dist/routing'
import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {SubmissionError} from 'redux-form'
import {createPropsSelector} from 'reselect-immutable-helpers'

import * as selectors from './selectors'
import * as appSelectors from '../app/selectors'

import {addToCart} from '../../integration-manager/cart/commands'
import {getProductVariantData} from '../../integration-manager/products/commands'
import {openModal, closeModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {addNotification} from '../app/actions'
import {PRODUCT_DETAILS_ITEM_ADDED_MODAL} from './constants'

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

export const goToCheckout = () => (dispatch, getState) => {
    dispatch(closeModal(PRODUCT_DETAILS_ITEM_ADDED_MODAL))
    if (isRunningInAstro) {
        // If we're running in Astro, we want to dismiss open the cart modal,
        // otherwise, navigating is taken care of by the button press
        trigger('open:cart-modal')
    } else {
        browserHistory.push(appSelectors.getCartURL(getState()))
    }
}

const submitCartFormSelector = createPropsSelector({
    key: appSelectors.getCurrentPathKey,
    qty: selectors.getItemQuantity,
    variations: selectors.getProductVariationCategories
})

export const submitCartForm = (formValues) => (dispatch, getStore) => {
    const {key, qty, variations} = submitCartFormSelector(getStore())

    if (variations) {
        const errors = {}
        variations.forEach(({id, label}) => {
            if (!formValues[id]) {
                errors[id] = `Please select a ${label}`
            }
        })
        if (Object.keys(errors).length > 0) {
            return Promise.reject(new SubmissionError(errors))
        }
    }

    dispatch(addToCartStarted())
    return dispatch(addToCart(key, qty))
        .then(() => dispatch(openModal(PRODUCT_DETAILS_ITEM_ADDED_MODAL)))
        .catch((error) => {
            console.error(`Error adding to cart: ${error}`)
            return dispatch(addNotification({
                content: 'Unable to add item to the cart.',
                id: 'addToCartError',
                showRemoveButton: true
            }))
        })
        .then(() => dispatch(addToCartComplete()))
}

const variationBlurSelector = createPropsSelector({
    variationSelections: selectors.getAddToCartFormValues,
    categoryIds: selectors.getProductVariationCategoryIds,
    variants: selectors.getProductVariants
})

export const onVariationBlur = () => (dispatch, getStore) => {
    const {
        variationSelections,
        categoryIds,
        variants
    } = variationBlurSelector(getStore())

    return dispatch(getProductVariantData(variationSelections, variants, categoryIds))
}
