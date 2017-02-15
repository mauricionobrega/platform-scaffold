import {initMobifyAnalytics, triggerMobifyPageView} from 'progressive-web-sdk/dist/analytics'

export const init = () => {
    initMobifyAnalytics(AJS_SLUG) // eslint-disable-line no-undef
}

export const analyticReceiver = (type, metaPayload, state) => {
    switch (type) {
        case 'Pageview':
            triggerMobifyPageView(metaPayload.name)
            break
    }
}
