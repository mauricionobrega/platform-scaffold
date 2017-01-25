import {createAction, makeFormEncodedRequest} from '../../utils/utils'
import {getCart} from '../cart/actions'
import {getRoutedState} from '../../utils/router-utils'
import * as selectors from './selectors'
import {openModal} from '../../store/modals/actions'
import {PDP_ITEM_ADDED_MODAL} from './constants'
import pdpParser from './parsers/pdp'
import {SELECTOR} from '../app/constants'

export const setItemQuantity = createAction('Set item quantity')

export const receiveData = createAction('Receive PDP data')
export const process = ({payload}) => {
    const {$, $response, url, currentURL} = payload
    const parsed = pdpParser($, $response)
    // Update the store using location.href as key and the result from
    // the parser as our value -- even if it isn't the page we're
    // currently viewing
    const output = {[url]: parsed}
    // Also set the store's current selector to location.href so we
    // can access it in our container, but only if we're on that href
    if (url === currentURL) {
        output[SELECTOR] = url
    }
    return receiveData(output)
}

export const submitCartForm = () => (dispatch, getStore) => {
    const routedState = getRoutedState(selectors.getPdp(getStore()))
    const formInfo = routedState.get('formInfo')
    const qty = routedState.get('itemQuantity')

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
