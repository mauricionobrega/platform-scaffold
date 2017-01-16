import {createSelector} from 'reselect'
import * as globalSelectors from '../../store/selectors'
export const getFooter = createSelector(
    globalSelectors.getUi,
    ({footer}) => footer
)
