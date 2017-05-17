/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'

import {SUGGESTION_URL} from './constants'
import {buildQueryString} from '../../utils/utils'
import {getSearchSuggestions} from '../../integration-manager/commands'
import {browserHistory} from 'progressive-web-sdk/dist/routing'

export const toggleHeader = createAction('Toggled the header', ['isCollapsed'])

export const openSearch = createAction('Open header search')
export const closeSearch = createAction('Close header search')
export const clearTerm = createAction('Clear search term')

export const searchQueryChanged = (query) => (dispatch) => (
    dispatch(getSearchSuggestions(query))
)

export const searchSubmit = (query) => (dispatch) => {
    browserHistory.push({pathname: `${SUGGESTION_URL}${buildQueryString(query)}`})
}
