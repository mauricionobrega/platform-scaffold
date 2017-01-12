import {createSelector} from 'reselect'
import * as globalSelectors from '../../store/selectors'
import {CURRENT_URL} from './constants'

export const getApp = createSelector(
    globalSelectors.getUi,
    ({app}) => app
)

export const getCurrentUrl = createSelector(
    getApp,
    (app) => app.get(CURRENT_URL)
)
