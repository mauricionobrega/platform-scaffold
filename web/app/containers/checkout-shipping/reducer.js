import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {mergePayload} from '../../utils/reducer-utils'
import {showCompanyAndApt} from './actions'
import {receiveCheckoutShippingData} from '../../integration-manager/responses'

export default handleActions({
    [receiveCheckoutShippingData]: mergePayload,
    [showCompanyAndApt]: (state) => {
        return state.merge({isCompanyOrAptShown: true})
    }
}, Immutable.Map())
