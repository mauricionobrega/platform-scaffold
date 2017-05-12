/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import * as analyticConstants from 'progressive-web-sdk/dist/analytics/analytic-constants'
import Distributor from 'progressive-web-sdk/dist/analytics/distributors/distributor'

const handlers = {
    [analyticConstants.pageview]: () => {
        // Send Pageview
    },
    [analyticConstants.transaction]: () => {
        // Send Transaction
    }
}

class ClientAnalytics extends Distributor {}

export const clientAnalytics = new ClientAnalytics(handlers)
