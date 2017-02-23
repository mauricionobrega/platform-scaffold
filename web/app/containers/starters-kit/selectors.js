import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import {getUi} from '../../store/selectors'

export const getStartersKit = createSelector(
    getUi,
    ({startersKit}) => startersKit
)

export const getTitle = createGetSelector(getStartersKit, 'title')
export const getText = createGetSelector(getStartersKit, 'text', Immutable.List())
