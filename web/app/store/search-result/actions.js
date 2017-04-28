import {createAction} from '../../utils/utils'
import {searchResultsParser, searchFilterParser} from './parsers/search-result'


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
