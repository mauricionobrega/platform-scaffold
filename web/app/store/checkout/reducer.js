import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayloadForActions} from '../../utils/reducer-utils'
import {receiveCheckoutData, receiveShippingMethodInitialValues} from './actions'
import {receiveCheckoutData as integrationManagerReceiveCheckoutData} from '../../integration-manager/responses'

const initialState = Immutable.Map()

const productReducer = handleActions({
    ...mergePayloadForActions(receiveCheckoutData, receiveShippingMethodInitialValues, integrationManagerReceiveCheckoutData)
}, initialState)

export default productReducer
