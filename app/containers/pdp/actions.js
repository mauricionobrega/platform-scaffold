import {createAction, makeFormEncodedRequest} from '../../utils/utils'
import {getCart} from '../cart/actions'
import {getRoutedState} from '../../utils/router-utils'
import * as selectors from './selectors'
import * as modalActions from '../../store/modals/actions'

export const setItemQuantity = createAction('Set item quantity')

export const openItemAddedModal = () => modalActions.openModal('pdp-item-added')
export const closeItemAddedModal = () => modalActions.closeModal('pdp-item-added')

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
        dispatch(openItemAddedModal())
        dispatch(getCart())
    })
}
