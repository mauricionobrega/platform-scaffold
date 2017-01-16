import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import * as globalSelectors from '../../store/selectors'

export const getFooter = createSelector(
    globalSelectors.getUi,
    ({footer}) => footer
)

export const getNewsletter = createGetSelector(getFooter, 'newsletter')
export const getNavigation = createGetSelector(getFooter, 'navigation')
