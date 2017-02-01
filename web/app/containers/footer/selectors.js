import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import {getUi} from '../../store/selectors'

export const getFooter = createSelector(getUi, ({footer}) => footer)

export const getNewsletter = createGetSelector(getFooter, 'newsletter')
export const getNavigation = createGetSelector(getFooter, 'navigation')
