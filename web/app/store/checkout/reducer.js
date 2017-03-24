import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayloadForActions} from '../../utils/reducer-utils'
import {receiveCheckoutData, receiveShippingMethodInitialValues} from './actions'
import {receiveCheckoutData as integrationManagerReceiveCheckoutData, receiveShippingMethodInitialValues as imReceiveShippingMethodInitialValues} from '../../integration-manager/checkout/responses'

const productReducer = handleActions({
    ...mergePayloadForActions(receiveCheckoutData, imReceiveShippingMethodInitialValues, receiveShippingMethodInitialValues, integrationManagerReceiveCheckoutData)
}, Immutable.Map())

export default productReducer
