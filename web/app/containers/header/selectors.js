import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import * as globalSelectors from '../../store/selectors'

export const getHeader = createSelector(
    globalSelectors.getUi,
    ({header}) => header
)


export const getIsCollapsed = createGetSelector(getHeader, 'isCollapsed')
