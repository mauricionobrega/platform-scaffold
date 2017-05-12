/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {onRouteChanged} from '../app/actions'

// This is now a placeholder; it may be removed down the road.

const productListReducer = handleActions({
    [onRouteChanged]: /* istanbul ignore next */(state) => state
}, Immutable.Map())

export default productListReducer
