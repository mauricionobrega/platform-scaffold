import {createAction, makeRequest, formEncode} from '../../utils/utils'

export const setItemQuantity = createAction('Set item quantity')

export const submitCartForm = () => (dispatch, getStore) => {
    const {pdp} = getStore()
    const formInfo = pdp.get('formInfo')
    const qty = pdp.get('itemQuantity')

    makeRequest(formInfo.get('submitUrl'), {
        method: formInfo.get('method'),
        body: formEncode({
            ...formInfo.get('hiddenInputs').toJS(),
            qty
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(() => {
        dispatch(setItemQuantity(1))
        window.location.href = "/checkout/cart"
    })
}
