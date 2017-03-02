import Immutable from 'immutable'
import {handleActions} from 'redux-actions'

import * as productDetailsActions from './actions'
import {receivePdpUIData} from '../../integration-manager/responses'

import {mergePayloadForActions} from '../../utils/reducer-utils'

const reducer = handleActions({
    ...mergePayloadForActions(
        productDetailsActions.receiveData,
        productDetailsActions.receiveNewItemQuantity,
        receivePdpUIData
    )
}, Immutable.Map())

export default reducer
