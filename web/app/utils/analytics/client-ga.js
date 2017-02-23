import * as analyticConstants from 'progressive-web-sdk/dist/analytics/analytic-constants'
import Distributor from 'progressive-web-sdk/dist/analytics/distributors/distributor'

const handlers = {
    [analyticConstants.pageview]: (payload) => {
        // Send Pageview
    },
    [analyticConstants.transaction]: (payload) => {
        // Send Transaction
    }
}

class ClientAnalytics extends Distributor {}

export const clientAnalytics = new ClientAnalytics(handlers)
