import * as analyticConstants from 'progressive-web-sdk/dist/analytics/analytic-constants'

let options

export const init = (initalizingOptions) => {
    options = initalizingOptions
    // initialize analytic setup
}

const handlers = {
    [analyticConstants.pageview]: (payload) => {
        // Send Pageview
    },
    [analyticConstants.transaction]: (payload) => {
        // Send Transaction
    }
}

export const analyticReceiver = (type, metaPayload, state) => {
    if (handlers.hasOwnProperty(type)) {
        handlers[type](metaPayload)
    }
}
