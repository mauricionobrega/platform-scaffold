import {createSelector} from 'reselect'
import * as globalSelectors from '../../store/selectors'

export const getLogin = createSelector(
    globalSelectors.getUi,
    ({login}) => login
)
