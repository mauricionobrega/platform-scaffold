import {createSelector} from 'reselect'
import * as globalSelectors from '../../store/selectors'

export const getCatalog = globalSelectors.getCatalog

export const getPlp = createSelector(
    globalSelectors.getUi,
    ({plp}) => plp
)
