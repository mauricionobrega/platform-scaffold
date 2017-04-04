import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'

export const getPrivacyPage = createSelector(
    getUi,
    ({privacyPage}) => privacyPage
)

export const getTitle = createGetSelector(getPrivacyPage, 'title', 'Loading page...')
export const getCookieList = createGetSelector(getPrivacyPage, 'cookieList')
export const getIntro = createGetSelector(getPrivacyPage, 'intro', 'Introduction')
export const getText = createGetSelector(getPrivacyPage, 'text', Immutable.List()) // Default is empty list
