import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {mergePayloadForActions} from '../../utils/reducer-utils'
import {receiveData, showCompanyAndApt} from './actions'
import {receiveCheckoutShippingData} from '../../integration-manager/responses'

export default handleActions({
    ...mergePayloadForActions(receiveData, receiveCheckoutShippingData),
    [showCompanyAndApt]: (state) => {
        return state.merge({isCompanyOrAptShown: true})
    }
}, Immutable.Map())
