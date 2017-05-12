/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {QUERY_URL, SUGGESTION_URL} from './constants'
import * as utils from '../../utils/utils'
import parseSearchSuggestions from './parsers/search-suggestions'
import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'

export const toggleHeader = utils.createAction('Toggled the header', 'isCollapsed')

export const receiveSearchSuggestions = utils.createAction('Received search suggestions')
export const openSearch = utils.createAction('Open header search', 'searchIsOpen')
export const closeSearch = utils.createAction('Close header search', 'searchIsOpen')

export const searchQueryChanged = (query) => {
    return (dispatch) => {
        // Mimic desktop behaviour, only make request search when query is 2 characters or more.
        // Empty list if less than 2 characters
        if (query.length < 2) {
            return dispatch(receiveSearchSuggestions(null))
        } else {
            const queryString = utils.buildQueryString(query)
            const queryURL = `${QUERY_URL}${queryString}&_=${Date.now()}`
            return makeRequest(queryURL)
                .then((response) => response.json())
                .then((responseJSON) => dispatch(receiveSearchSuggestions(parseSearchSuggestions(responseJSON))))
        }
    }
}

export const searchSubmit = (query) => {
    return (dispatch) => {
        const queryString = utils.buildQueryString(query)
        const searchURL = `${SUGGESTION_URL}${queryString}`
        window.location.href = `${window.location.origin}${searchURL}`
    }
}
