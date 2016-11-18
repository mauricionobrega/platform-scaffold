import {createAction, makeFormEncodedRequest} from '../../utils/utils'
import {getCart} from '../cart/actions'

export const setItemQuantity = createAction('Set item quantity')

export const openItemAddedModal = createAction('Open Item Added Sheet')
export const closeItemAddedModal = createAction('Close Item Added Sheet')

export const submitCartForm = () => (dispatch, getStore) => {
    const {pdp} = getStore()
    const formInfo = pdp.get('formInfo')
    const qty = pdp.get('itemQuantity')

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
