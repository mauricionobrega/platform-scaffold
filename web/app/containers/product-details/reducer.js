import Immutable from 'immutable'
import {handleActions} from 'redux-actions'

import * as productDetailsActions from './actions'

import {mergePayloadForActions} from '../../utils/reducer-utils'

const reducer = handleActions({
    ...mergePayloadForActions(
        productDetailsActions.receiveData,
        productDetailsActions.receiveNewItemQuantity
    )
}, Immutable.Map())

export default reducer
