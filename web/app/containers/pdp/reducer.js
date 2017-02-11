import Immutable from 'immutable'
import {handleActions} from 'redux-actions'

import * as pdpActions from './actions'

import {mergePayloadForActions} from '../../utils/reducer-utils'

const reducer = handleActions({
    ...mergePayloadForActions(
        pdpActions.receiveData,
        pdpActions.receiveNewItemQuantity
    )
}, Immutable.Map())

export default reducer
