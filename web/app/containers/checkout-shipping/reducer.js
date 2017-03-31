import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {mergePayload} from '../../utils/reducer-utils'
import {showCompanyAndApt, setCustomerEmailRecognized} from './actions'
import {receiveCheckoutShippingData} from '../../integration-manager/checkout/responses'

export default handleActions({
    [receiveCheckoutShippingData]: mergePayload,
    [setCustomerEmailRecognized]: mergePayload,
    [showCompanyAndApt]: (state) => {
        return state.merge({isCompanyOrAptShown: true})
    }
}, Immutable.Map())
