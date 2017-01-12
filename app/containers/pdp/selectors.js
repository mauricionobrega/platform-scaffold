import {createSelector} from 'reselect'
import * as globalSelectors from '../../store/selectors'

export const getPdp = createSelector(
    globalSelectors.getUi,
    ({pdp}) => pdp
)
export const getCatalog = globalSelectors.getCatalog
