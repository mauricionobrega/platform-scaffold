import {createSelector} from 'reselect'
import * as globalSelectors from '../../store/selectors'

export const getCatalog = createSelector(
    globalSelectors.getUi,
    ({catalog}) => catalog
)

export const getPlp = createSelector(
    globalSelectors.getUi,
    ({plp}) => plp
)
