import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {PAGE_COUNT, VISIT_COUNTDOWN} from './constants'

export const getPushMessaging = ({pushMessaging}) => pushMessaging

export const isSubscribed = createGetSelector(getPushMessaging, 'subscribed')
export const canSubscribe = createGetSelector(getPushMessaging, 'canSubscribe')
export const canShowSoftAsk = createSelector(isSubscribed, canSubscribe, (subscribed, can) => !subscribed && can)

export const getPageCount = createGetSelector(getPushMessaging, PAGE_COUNT)
export const getVisitCountdown = createGetSelector(getPushMessaging, VISIT_COUNTDOWN)
export const getMessagingChannels = createGetSelector(getPushMessaging, 'channels')
