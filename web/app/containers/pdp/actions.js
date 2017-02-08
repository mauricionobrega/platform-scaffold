import {createAction, makeFormEncodedRequest} from '../../utils/utils'
import {getCart} from '../cart/actions'
import {getRoutedState} from '../../utils/router-utils'

import {isRunningInAstro} from '../../utils/astro-integration'
import Astro from '../../vendor/astro-client'

export const setItemQuantity = createAction('Set item quantity')

export const openItemAddedModal = createAction('Open Item Added Sheet')
export const closeItemAddedModal = createAction('Close Item Added Sheet')

export const goToCheckout = () => (dispatch, getStore) => {
    dispatch(closeItemAddedModal())
    if (isRunningInAstro) {
        Astro.trigger('open:cart-modal')
    } else {
        // open web checkout
    }
}

export const submitCartForm = () => (dispatch, getStore) => {
    const routedState = getRoutedState(getStore().pdp)
    const formInfo = routedState.get('formInfo')
    const qty = routedState.get('itemQuantity')

    return makeFormEncodedRequest(formInfo.get('submitUrl'), {
        ...formInfo.get('hiddenInputs').toJS(),
        qty
    }, {
        method: formInfo.get('method')
    }).then(() => {
        dispatch(openItemAddedModal())
        dispatch(getCart())
    })
}
