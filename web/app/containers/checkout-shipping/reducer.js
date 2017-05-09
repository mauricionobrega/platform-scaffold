/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {mergePayload} from '../../utils/reducer-utils'
import {receiveData, showCompanyAndApt, setShowAddNewAddress} from './actions'

export default handleActions({
    [receiveData]: mergePayload,
    [setShowAddNewAddress]: mergePayload,
    [showCompanyAndApt]: (state) => {
        return state.merge({isCompanyOrAptShown: true})
    }
}, Immutable.Map())
