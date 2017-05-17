/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
import {SUGGESTION_URL} from '../../containers/header/constants'
import {buildQueryString} from '../../utils/utils'

export const parseSearchSuggestions = (json) => {
    if (!json.length) {
        return null
    }

    const suggestions = json.map((data) => {
        const searchTerm = data.title
        const numResults = data.num_results
        return {
            href: `${SUGGESTION_URL}${buildQueryString(searchTerm)}`,
            children: searchTerm,
            endAction: `${numResults} result${numResults > 1 ? 's' : ''}`
        }
    })

    return suggestions
}
