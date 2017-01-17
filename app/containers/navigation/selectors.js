import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import * as globalSelectors from '../../store/selectors'

export const getNavigation = createSelector(
    globalSelectors.getUi,
    ({navigation}) => navigation
)

export const getPath = createGetSelector(getNavigation, 'path')
export const getNavigationIsOpen = createGetSelector(getNavigation, 'isOpen')
export const getNavigationRoot = createGetSelector(getNavigation, 'root')
