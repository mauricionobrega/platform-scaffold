import * as MobifyGA from './analytics/mobify-ga'

let distributors = [
	MobifyGA
]

export const analyticsInitializer = (...otherDistributors) => {
	distributors = [
		...distributors,
		...otherDistributors
	]
	distributors.forEach((distributor) => {
		distributor.init()
	})
}

export const analyticsDistributor = (type, {state, metaPayload}) => {
	distributors.forEach((distributor) => {
		distributor.analyticReceiver(type, state, metaPayload)
	})
}