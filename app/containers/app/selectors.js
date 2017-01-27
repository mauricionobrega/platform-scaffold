import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import * as globalSelectors from '../../store/selectors'
import {urlToPathKey} from '../../utils/utils'
import {CURRENT_URL} from './constants'

export const getApp = createSelector(
    globalSelectors.getUi,
    ({app}) => app
)

export const getCurrentUrl = createGetSelector(getApp, CURRENT_URL)
export const getCurrentPathKey = createSelector(getCurrentUrl, urlToPathKey)
export const getNotifications = createGetSelector(getApp, 'notifications')
