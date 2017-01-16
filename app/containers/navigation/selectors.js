import {createSelector} from 'reselect'
import * as globalSelectors from '../../store/selectors'

export const getNavigation = createSelector(
    globalSelectors.getUi,
    ({navigation}) => navigation
)
