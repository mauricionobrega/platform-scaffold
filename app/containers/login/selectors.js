import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import * as globalSelectors from '../../store/selectors'

export const getLogin = createSelector(
    globalSelectors.getUi,
    ({login}) => login
)

export const getLoginTitle = createGetSelector(getLogin, 'title')
export const getSigninSection = createGetSelector(getLogin, 'signinSection')
export const getRegisterSection = createGetSelector(getLogin, 'registerSection')
export const getLoginLoaded = createGetSelector(getLogin, 'loaded')
