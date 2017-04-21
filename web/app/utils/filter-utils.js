const NON_FLOAT_REGEX = /[^\d.]/g

const RULESETS = {
    price: (item, range) => {
        const price = parseFloat(item.price.replace(NON_FLOAT_REGEX, ''))
        return price >= range.floor && price <= range.ceiling
    },
    // insert more rules when applicable
}


/**
 * evaluate - Used to verify whether an object meets the criteria of a ruleset.
 * For example, whether an object has a color prop of a certain alue. A more
 * specific example:
 *
 *     evaluate({ color: 'red' }, 'color', 'blue') // => false
 *     evaluate({ color: 'red' }, 'color', 'red') // => true
 *
 * @param {object} item - The identifer with which the RULESETS can apply the
 * @param {string} ruleset - The condition or filtering parameter with
 * @param {string|object} criteria - The condition or filtering parameter with.
          The exact value passed depends on the ruleset being used.
 * @returns {boolean} - Whether or not the item meets the ruleset's criteria
 */
const evaluate = (item, ruleset, criteria) => RULESETS[ruleset](item, criteria)


/**
 * toTokens - A reduce function callback that takes a list of filters and
 * reduces them down into a list of tokenized filters. The tokens can be used to
 * generate a function callback (see byTokens below) for use in a filter method.
 * Example usage:
 *
 *    const filters = getFilters.toJS()
 *    // => [{ruleset: 'price', kinds: [{active: true, criteria: 'blue', ...}]}, ...]
 *    //    list of standardized filters from the store
 *
 *    const tokens = filters.reduce(toTokens, [])
 *    // => [{ruleset: 'price', criteria: 'blue'}, ...]
 *    //    list of tokenized filters
 *
 * @param {array} list - the list that has only active tokens appended to it.
 * @param {object} currentFilter - the current filter object
 * @returns {array} - The final list of filter tokens in the format of {ruleset, criteria}
 */
export const toTokens = (list, currentFilter) => {
    currentFilter.kinds.forEach((kind) => {
        if (kind.active) {
            const token = {
                ruleset: currentFilter.ruleset,
                criteria: kind.criteria
            }

            list.push(token)
        }
    })

    return list
}


/**
 * byTokens - An array filter callback to shrink down a list of items
 * based on the provided filter tokens. Example usage:
 *
 *    const items = [{}, {}, ...]
 *    const tokens = getFilters.toJS().reduce(toTokens, [])
 *    items.filter(byTokens(tokens)) => items matching token criteria
 *
 * @param  {array} tokenList - list of filter tokens (see toToken function
           above). It's param `currentItem` is likely an object that will
           eventually be consumed by a React component.
 * @returns {function} - a callback function, intended for filter methods
 */
export const byTokens = (tokenList) => (currentItem) => {
    if (!currentItem) {
        return false
    }

    if (tokenList.length === 0) {
        return true
    }

    let valid = false

    tokenList.forEach(({ruleset, criteria}) => {
        const isValid = evaluate(currentItem, ruleset, criteria)

        if (isValid) {
            valid = true
        }
    })

    return valid
}
