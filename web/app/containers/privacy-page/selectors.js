// import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'

export const getPrivacyPage = createSelector(
    getUi,
    ({privacyPage}) => privacyPage
)

export const getCookieList = createGetSelector(getPrivacyPage, 'cookieList')
export const getPara = createGetSelector(getPrivacyPage, 'para')
export const getWarning = createGetSelector(getPrivacyPage, 'warning')
export const getTitle = createGetSelector(getPrivacyPage, 'title')
// export const getText = createGetSelector(getPrivacyPage, 'text', Immutable.List())
