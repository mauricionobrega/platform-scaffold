import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import {getUi} from '../../store/selectors'

export const getNavigation = createSelector(getUi, ({navigation}) => navigation)

export const getPath = createGetSelector(getNavigation, 'path')
export const getNavigationRoot = createGetSelector(getNavigation, 'root')

export const getNavigationChildren = createGetSelector(getNavigationRoot, 'children', Immutable.List())
