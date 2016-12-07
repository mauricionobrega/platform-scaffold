import {createAction, makeFormEncodedRequest} from '../../utils/utils'
import {getCart} from '../cart/actions'
import {getRoutedState} from '../../utils/router-utils'

export const setItemQuantity = createAction('Set item quantity')

export const openItemAddedModal = createAction('Open Item Added Sheet')
export const closeItemAddedModal = createAction('Close Item Added Sheet')

export const submitCartForm = () => (dispatch, getStore) => {
    const routedState = getRoutedState(getStore().pdp)
    const formInfo = routedState.get('formInfo')
    const qty = routedState.get('itemQuantity')

    makeFormEncodedRequest(formInfo.get('submitUrl'), {
        ...formInfo.get('hiddenInputs').toJS(),
        qty
    }, {
        method: formInfo.get('method')
    }).then(() => {
        dispatch(openItemAddedModal())
        dispatch(getCart())
    })
}
