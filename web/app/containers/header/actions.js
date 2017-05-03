import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'

import {QUERY_URL, SUGGESTION_URL} from './constants'
import * as utils from '../../utils/utils'
import parseSearchSuggestions from './parsers/search-suggestions'
import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'

export const toggleHeader = createAction('Toggled the header', ['isCollapsed'])

export const receiveSearchSuggestions = createAction('Received search suggestions')
export const openSearch = createAction('Open header search')
export const closeSearch = createAction('Close header search')

export const searchQueryChanged = (query) => (dispatch) => {
    // Mimic desktop behaviour, only make request search when query is 2 characters or more.
    // Empty list if less than 2 characters
    if (query.length < 2) {
        return dispatch(receiveSearchSuggestions(null))
    }

    const queryURL = `${QUERY_URL}${utils.buildQueryString(query)}&_=${Date.now()}`
    return makeRequest(queryURL)
        .then((response) => response.json())
        .then((responseJSON) => dispatch(receiveSearchSuggestions(parseSearchSuggestions(responseJSON))))
}

export const searchSubmit = (query) => (dispatch) => {
    window.location.href = `${window.location.origin}${SUGGESTION_URL}${utils.buildQueryString(query)}`
}
