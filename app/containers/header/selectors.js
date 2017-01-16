import {createSelector} from 'reselect'
import * as globalSelectors from '../../store/selectors'
export const getHeader = createSelector(
    globalSelectors.getUi,
    ({header}) => header
)

export const getIsCollapsed = createSelector(
    getHeader,
    (header) => header.get('isCollapsed')
)

export const getItemCount = createSelector(
    getHeader,
    (header) => header.get('itemCount')
)
