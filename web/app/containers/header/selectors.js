import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import {getUi} from '../../store/selectors'

export const getHeader = createSelector(getUi, ({header}) => header)

export const getIsCollapsed = createGetSelector(getHeader, 'isCollapsed')
