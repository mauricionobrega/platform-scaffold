import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload} from '../../utils/reducer-utils'
import {receiveSearchResult, receiveSearchResultFilters, changeSearchResultSortOption} from './actions'

const searchResultReducer = handleActions({
    [receiveSearchResult]: mergePayload,
    [changeSearchResultSortOption]: mergePayload,
    [receiveSearchResultFilters]: mergePayload
}, Immutable.Map())

export default searchResultReducer
