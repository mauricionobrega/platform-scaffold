import Immutable from 'immutable'
import {handleActions} from 'redux-actions'

import * as productDetailsActions from './actions'

import {mergePayloadForActions} from '../../utils/reducer-utils'

const reducer = handleActions({
    [productDetailsActions.addToCartStarted]: (state) => state.set('addToCartInProgress', true),
    [productDetailsActions.addToCartComplete]: (state) => state.set('addToCartInProgress', false),
    ...mergePayloadForActions(
        productDetailsActions.receiveData,
        productDetailsActions.receiveNewItemQuantity
    )
}, Immutable.Map())

export default reducer
