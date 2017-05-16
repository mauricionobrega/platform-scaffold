/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import * as checkoutConfirmationActions from './actions'
import {receiveCheckoutConfirmationData} from '../../integration-manager/checkout/results'
import {mergePayload} from '../../utils/reducer-utils'
import {receiveOrderConfirmationContents} from '../../integration-manager/results'

export default handleActions({
    [receiveOrderConfirmationContents]: mergePayload,
    [receiveCheckoutConfirmationData]: mergePayload,
    [checkoutConfirmationActions.hideRegistrationForm]: (state) => {
        return state.set('isRegistrationFormHidden', true)
    }
}, Immutable.Map())
