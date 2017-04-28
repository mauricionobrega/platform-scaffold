import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {mergePayload} from '../../utils/reducer-utils'
import {showCompanyAndApt, setCustomerEmailRecognized} from './actions'

export default handleActions({
    [setCustomerEmailRecognized]: mergePayload,
    [showCompanyAndApt]: (state) => {
        return state.set('isCompanyOrAptShown', true)
    }
}, Immutable.Map())
