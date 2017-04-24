import {SUGGESTION_URL} from '../constants'

const parseSearchSuggestions = (json) => {
    if (!json.length) {
        return null
    }

    const suggestions = json.map((data) => {
        const searchTerm = data.title
        return {
            href: `${SUGGESTION_URL}${searchTerm.replace(/ /g, '+')}`,
            children: searchTerm
        }
    })

    return suggestions
}

export default parseSearchSuggestions
