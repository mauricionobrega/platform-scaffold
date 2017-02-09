import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import {getUi} from '../../store/selectors'
import {urlToPathKey} from '../../utils/utils'
import {CURRENT_URL} from './constants'

export const getApp = createSelector(getUi, ({app}) => app)

export const getCurrentUrl = createGetSelector(getApp, CURRENT_URL)
export const getCurrentPathKey = createSelector(getCurrentUrl, urlToPathKey)
export const getNotifications = createGetSelector(getApp, 'notifications')
export const getIsLoggedIn = createGetSelector(getApp, 'isLoggedIn')
