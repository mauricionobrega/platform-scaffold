import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'

export const getSearchResult = createSelector(
    getUi,
    ({searchResult}) => searchResult
)

export const getTitle = createGetSelector(getSearchResult, 'title')
export const getText = createGetSelector(getSearchResult, 'text', Immutable.List())
