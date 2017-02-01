import {createAction, makeFormEncodedRequest} from '../../utils/utils'
import {getCart} from '../cart/actions'
import * as selectors from './selectors'
import * as appSelectors from '../app/selectors'
import {openModal} from '../../store/modals/actions'
import {PDP_ITEM_ADDED_MODAL} from './constants'
import pdpParser from './parsers/pdp'

export const receiveNewItemQuantity = createAction('Set item quantity')
export const setItemQuantity = (quantity) => (dispatch, getStore) => {
    dispatch(receiveNewItemQuantity({
        [appSelectors.getCurrentUrl(getStore())]: {
            itemQuantity: quantity
        }
    }))
}

export const receiveData = createAction('Receive PDP data')
export const process = ({payload}) => {
    const {$, $response, url} = payload
    const parsed = pdpParser($, $response)
    return receiveData({[url]: parsed})
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
