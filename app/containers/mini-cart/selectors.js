import {createSelector} from 'reselect'
import * as globalSelectors from '../../store/selectors'

export const getMiniCart = createSelector(
    globalSelectors.getUi,
    ({miniCart}) => miniCart
)
