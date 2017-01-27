import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import * as globalSelectors from '../../store/selectors'
import * as miniCartSelectors from '../mini-cart/selectors'

export const getHeader = createSelector(
    globalSelectors.getUi,
    ({header}) => header
)


export const getIsCollapsed = createGetSelector(getHeader, 'isCollapsed')
export const getItemCount = miniCartSelectors.getMiniCartSummaryCount
