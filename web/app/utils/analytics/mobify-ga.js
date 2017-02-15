import {initMobifyAnalytics, triggerMobifyPageView} from 'progressive-web-sdk/dist/analytics'

export const init = () => {
	initMobifyAnalytics(AJS_SLUG) // eslint-disable-line no-undef
}

export const analyticReceiver = (type, state, metaPayload) => {
	switch(type) {
		case 'Pageview':
			debugger
			triggerMobifyPageView('route') // get route here somehow
			break
	}
}