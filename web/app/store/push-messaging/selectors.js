import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {PAGE_VISIT_COUNT} from './constants'

export const getPushMessaging = ({pushMessaging}) => pushMessaging

export const isSubscribed = createGetSelector(getPushMessaging, 'subscribed')
export const canSubscribe = createGetSelector(getPushMessaging, 'canSubscribe')
export const canShowSoftAsk = createSelector(isSubscribed, canSubscribe, (subscribed, can) => !subscribed && can)

export const getPageVisitCount = createGetSelector(getPushMessaging, PAGE_VISIT_COUNT)
export const getMessagingChannels = createGetSelector(getPushMessaging, 'channels')
