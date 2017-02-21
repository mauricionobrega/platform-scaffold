import {createSelector} from 'reselect'
import {createGetSelector, createHasSelector} from '../../utils/selector-utils'
import {getUi} from '../../store/selectors'
import {urlToPathKey} from '../../utils/utils'
import {CURRENT_URL, FETCHED_PATHS} from './constants'

export const getApp = createSelector(getUi, ({app}) => app)

export const getCurrentUrl = createGetSelector(getApp, CURRENT_URL)
export const getCurrentPathKey = createSelector(getCurrentUrl, urlToPathKey)
export const getNotifications = createGetSelector(getApp, 'notifications')

// This will need to become more complicated when we handle more types of errors,
// but will do for now
export const getFetchError = createGetSelector(getApp, 'fetchError')
export const getFetchedPaths = createGetSelector(getApp, FETCHED_PATHS)
export const hasFetchedCurrentPath = createHasSelector(getFetchedPaths, getCurrentPathKey)

export const getIsLoggedIn = createGetSelector(getApp, 'isLoggedIn')
