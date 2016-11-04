import {createAction} from '../../utils/utils'
import {getCart} from '../cart/actions'

export const receiveContents = createAction('Received MiniCart Contents')

export const openMiniCart = createAction('Open navigation')
export const closeMiniCart = createAction('Close navigation')

export const fetchContents = () => {
    return (dispatch) => {
        getCart()
        .then((cartContents) => {
            dispatch(receiveContents(cartContents))
        })
    }
}
