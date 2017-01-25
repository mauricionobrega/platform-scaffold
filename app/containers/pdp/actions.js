import {createAction, makeFormEncodedRequest} from '../../utils/utils'
import {getCart} from '../cart/actions'
import {getRoutedState} from '../../utils/router-utils'
import * as selectors from './selectors'
import {openModal} from '../../store/modals/actions'
import {PDP_ITEM_ADDED_MODAL} from './constants'

export const setItemQuantity = createAction('Set item quantity')

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
