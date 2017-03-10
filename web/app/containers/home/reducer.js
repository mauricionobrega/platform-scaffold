import {handleActions} from 'redux-actions'
import {fromJS} from 'immutable'
import {mergePayloadForActions} from '../../utils/reducer-utils'

import {receiveHomeData} from '../../integration-manager/responses'

const CATEGORY_PLACEHOLDER_COUNT = 6

const initialState = fromJS({
    categories: new Array(CATEGORY_PLACEHOLDER_COUNT).fill({}),
    banners: []
})

export default handleActions({
    ...mergePayloadForActions(receiveHomeData)
}, initialState)
