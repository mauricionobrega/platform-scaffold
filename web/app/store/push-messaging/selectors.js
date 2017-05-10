import {createGetSelector} from 'reselect-immutable-helpers'
import {getPushMessaging} from '../selectors'

export const getCanShowSoftAsk = createGetSelector(getPushMessaging, 'canShowSoftAsk')
