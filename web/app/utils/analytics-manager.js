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

export const analyticsDistributor = (type, metaPayload, state) => {
    distributors.forEach((distributor) => {
        distributor.analyticReceiver(type, metaPayload, state)
    })
}
