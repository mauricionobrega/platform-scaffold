import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getPushMessaging} from '../selectors'

export const isSubscribed = createGetSelector(getPushMessaging, 'subscribed')
export const canSubscribe = createGetSelector(getPushMessaging, 'canSubscribe')

export const canShowSoftAsk = createSelector(isSubscribed, canSubscribe, (subscribed, can) => !subscribed && can)

export const getMessagingChannels = createGetSelector(getPushMessaging, 'channels')
