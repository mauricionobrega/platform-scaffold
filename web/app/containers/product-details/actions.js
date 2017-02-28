import {createAction, makeFormEncodedRequest, urlToPathKey} from '../../utils/utils'
import {getCart} from '../../store/cart/actions'
import * as selectors from './selectors'
import * as appSelectors from '../app/selectors'
import {openModal} from '../../store/modals/actions'
import {PRODUCT_DETAILS_ITEM_ADDED_MODAL} from './constants'
import productDetailsParser from './parsers/product-details'

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

export const receiveData = createAction('Receive Product Details data')
export const process = ({payload}) => {
    const {$, $response, url} = payload
    const parsed = productDetailsParser($, $response)
    return receiveData({[urlToPathKey(url)]: parsed})
}

export const submitCartForm = () => (dispatch, getStore) => {
    const formInfo = selectors.getFormInfo(getStore())
    const qty = selectors.getItemQuantity(getStore())
    dispatch(addToCartStarted())

    return makeFormEncodedRequest(formInfo.get('submitUrl'), {
        ...formInfo.get('hiddenInputs').toJS(),
        qty
    }, {
        method: formInfo.get('method')
    }).then(() => {
        dispatch(addToCartComplete())
        dispatch(openModal(PRODUCT_DETAILS_ITEM_ADDED_MODAL))
        dispatch(getCart())
    })
}
