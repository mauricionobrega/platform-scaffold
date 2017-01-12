import {createSelector} from 'reselect'
import * as globalSelectors from '../../store/selectors'

export const getCart = createSelector(
    globalSelectors.getUi,
    ({cart}) => cart
)

export const getMiniCart = createSelector(
    globalSelectors.getUi,
    ({miniCart}) => miniCart
)
