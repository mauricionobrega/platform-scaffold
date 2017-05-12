/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {mergePayload} from '../../utils/reducer-utils'
import {receiveData, setRemoveItemId, setIsWishlistComplete, setTaxRequestInitiation} from './actions'


export default handleActions({
    [setTaxRequestInitiation]: mergePayload,
    [receiveData]: mergePayload,
    [setRemoveItemId]: mergePayload,
    [setIsWishlistComplete]: mergePayload
}, Immutable.Map())
