import {createSelector} from 'reselect'
import {getUi} from '../../store/selectors'

export const getCart = createSelector(getUi, ({cart}) => cart)
