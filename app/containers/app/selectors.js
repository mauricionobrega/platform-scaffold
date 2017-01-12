export const getApp = ({app}) => app
import {createSelector} from 'reselect'
import {CURRENT_URL} from './constants'

export const getCurrentUrl = createSelector(
    getApp,
    (app) => app.get(CURRENT_URL)
)
