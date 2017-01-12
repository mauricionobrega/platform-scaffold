import {createSelector} from 'reselect'
import * as globalSelectors from '../../store/selectors'
export const getHeader = createSelector(
    globalSelectors.getUi,
    ({header}) => header
)
