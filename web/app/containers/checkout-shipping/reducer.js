import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {mergePayloadForActions} from '../../utils/reducer-utils'
import {showCompanyAndApt, receiveCheckoutShippingData} from './actions'
import * as integrationManagerResponses from '../../integration-manager/checkout/responses'


export default handleActions({
    ...mergePayloadForActions(integrationManagerResponses.receiveCheckoutShippingData, receiveCheckoutShippingData),
    [showCompanyAndApt]: (state) => {
        return state.merge({isCompanyOrAptShown: true})
    }
}, Immutable.Map())
