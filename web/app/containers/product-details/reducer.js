import Immutable from 'immutable'
import {handleActions} from 'redux-actions'

import * as productDetailsActions from './actions'
import {receiveProductDetailsUIData} from '../../integration-manager/products/responses'

import {mergePayload} from '../../utils/reducer-utils'

const reducer = handleActions({
    [productDetailsActions.addToCartStarted]: (state) => state.set('addToCartInProgress', true),
    [productDetailsActions.addToCartComplete]: (state) => state.set('addToCartInProgress', false),
    [receiveProductDetailsUIData]: mergePayload,
    [productDetailsActions.receiveNewItemQuantity]: mergePayload
}, Immutable.Map())

export default reducer
