import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayloadForActions} from '../../utils/reducer-utils'
import {receiveCheckoutData, receiveShippingMethodInitialValues} from './actions'
import {receiveCheckoutData as integrationManagerReceiveCheckoutData} from '../../integration-manager/responses'

const productReducer = handleActions({
    ...mergePayloadForActions(receiveCheckoutData, receiveShippingMethodInitialValues, integrationManagerReceiveCheckoutData)
}, Immutable.Map())

export default productReducer
