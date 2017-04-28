import {createAction} from '../../utils/utils'
import {searchResultsParser, searchFilterParser} from './parsers/search-result'
import {getSort} from '../../containers/search-result/selectors'
// import {getCurrentPathKey} from '../../containers/app/selectors'
// import {getSearchResultProducts} from '../../containers/search-resutl/selectors'


export const receiveSearchResult = createAction('Receive Search Results')
export const receiveSearchResultFilters = createAction('Receive Search Results Filter')

export const processSearchResultData = ({payload: {$, $response}}) => {
    return (dispatch) => {
        const searchResultData = searchResultsParser($, $response)
        const filterData = searchFilterParser()

        dispatch(receiveSearchResult({
            filterData,
            ...searchResultData
        }))
    }
}

export const changeSearchResultSortOption = createAction('Change Search Result Sort Option', 'sort')

export const changeSort = (sortValue) => (dispatch, getStore) => {
    const currentState = getStore()
    const getSortData = getSort(currentState).toJS()
    getSortData.options.forEach((option) => {
        option.selected = option.value === sortValue
    })
    dispatch(changeSearchResultSortOption(getSortData))
}
