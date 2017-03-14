import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'

export const getNavigation = createSelector(getUi, ({navigation}) => navigation)

export const getPath = createGetSelector(getNavigation, 'path')
export const getNavigationRoot = createGetSelector(getNavigation, 'root')
