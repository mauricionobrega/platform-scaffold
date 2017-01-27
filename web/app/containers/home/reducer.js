import {handleActions} from 'redux-actions'
import {fromJS} from 'immutable'
import {mergePayloadForActions} from '../../utils/reducer-utils'

import {receiveData} from './actions'

const CATEGORY_PLACEHOLDER_COUNT = 6

const initialState = fromJS({
    categories: new Array(CATEGORY_PLACEHOLDER_COUNT).fill({}),
    banners: []
})

export default handleActions({
    ...mergePayloadForActions(receiveData)
}, initialState)
