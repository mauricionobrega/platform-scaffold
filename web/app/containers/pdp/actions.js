import {createAction, makeFormEncodedRequest, urlToPathKey} from '../../utils/utils'
import {getCart} from '../../store/cart/actions'
import * as selectors from './selectors'
import * as appSelectors from '../app/selectors'
import {openModal, closeModal} from '../../store/modals/actions'
import {PDP_ITEM_ADDED_MODAL} from './constants'
import pdpParser from './parsers/pdp'

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

export const receiveData = createAction('Receive PDP data')
export const process = ({payload}) => {
    const {$, $response, url} = payload
    const parsed = pdpParser($, $response)
    return receiveData({[urlToPathKey(url)]: parsed})
}

export const goToCheckout = () => (dispatch) => {
    dispatch(closeModal(PDP_ITEM_ADDED_MODAL))
    if (isRunningInAstro) {
        // If we're running in Astro, we want to dismiss open the cart modal,
        // otherwise, navigating is taken care of by the button press
        Astro.trigger('open:cart-modal')
    }
}

export const submitCartForm = () => (dispatch, getStore) => {
    const formInfo = selectors.getFormInfo(getStore())
    const qty = selectors.getItemQuantity(getStore())

    return makeFormEncodedRequest(formInfo.get('submitUrl'), {
        ...formInfo.get('hiddenInputs').toJS(),
        qty
    }, {
        method: formInfo.get('method')
    }).then(() => {
        dispatch(openModal(PDP_ITEM_ADDED_MODAL))
        dispatch(getCart())
    })
}
