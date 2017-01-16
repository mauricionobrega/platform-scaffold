import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import * as globalSelectors from '../../store/selectors'
import {CURRENT_URL} from './constants'

export const getApp = createSelector(
    globalSelectors.getUi,
    ({app}) => app
)

export const getCurrentUrl = createGetSelector(getApp, CURRENT_URL)

export const getNotifications = createSelector(
    getApp,
    (app) => app.get('notifications')
)
