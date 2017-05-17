/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {mergePayload} from '../../utils/reducer-utils'
import {toggleCompanyAndApt, setShowAddNewAddress, setCustomerEmailRecognized} from './actions'

export default handleActions({
    [setCustomerEmailRecognized]: mergePayload,
    [setShowAddNewAddress]: mergePayload,
    [toggleCompanyAndApt]: mergePayload
}, Immutable.Map())
