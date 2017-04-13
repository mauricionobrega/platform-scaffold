const NON_NUMERIC_REGEX = /\D/
const FILTER_TYPES = {
    price: (item, range) => {
        const price = parseInt(item.price.replace(NON_NUMERIC_REGEX, ''))
        return price >= range.floor && price <= range.ceiling
    },
    color: () => false
}

// Filter token
const tokenize = (id, value) => ({
    filterId: id,
    filterValue: value
})


/**
 * makeActiveFilterList - Generates a list of filter tokens, such as those
 * typically available in product lists (price, color, etc.)
 *
 * @param {array} - list of filter objects with keys for `id`, `kinds`, `label`
 * @returns {array} - list of filter tokens, with inactive filters omitted
 */
export const makeActiveFilterList = (filters) => {
    if (filters.length <= 0) {
        return []
    }

    // returns a list of filter tokens for each "kind" of active filter
    const tokenList = filters.reduce((list, current) => {
        current.kinds.forEach((kind) => {
            if (kind.active) {
                list.push(tokenize(current.id, kind.value))
            }
        })

        return list
    }, [])

    return tokenList
}


/**
 * Returns a callback function for use in an array filter method. Example usage:
 *
 *    [].filter(byFilterTokens(myFilterTokenList))
 *
 * @param  {array} - list of filter tokens
 * @returns {function} - a callback function, intended for filter methods
 *
 */
export const byFilterTokens = (tokenList) => (currentItem) => {

    // Either 1) no filters are active, thus all items are valid, or 2) the
    // current item is itself invalid and won't render anything anyway.
    if (tokenList.length === 0 || !currentItem) {
        return true
    }

    let valid = false

    tokenList.forEach((token) => {
        const isValid = FILTER_TYPES[token.filterId](currentItem, token.filterValue)

        if (isValid) {
            valid = true
        }
    })

    return valid
}
