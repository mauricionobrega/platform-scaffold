const NON_NUMERIC_REGEX = /\D/

const RULESETS = {
    price: (item, range) => {
        const price = parseInt(item.price.replace(NON_NUMERIC_REGEX, ''))
        return price >= range.floor && price <= range.ceiling
    }
    // insert more rules when applicable
}


/**
 * evaluate - Used to verify whether an object meets the criteria of a ruleset.
 * In simple terms, for example, whether an object has a color prop of a certain
 * value. A more specific example:
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
 * determine whether an object meets that filter's criteria. See evaluate above.
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
 *    const tokens = [max20dollarsToken, colorBlueToken, ...]
 *    items.filter(byTokens(tokens)) => items matching token criteria
 *
 * @param  {array} tokenList - list of filter tokens (see tokenize function
           above). It's param `currentItem` is likely an object that will
           eventually be consumed by a React component.
 * @returns {function} - a callback function, intended for filter methods
 */
export const byTokens = (tokenList) => (currentItem) => {
    if (tokenList.length === 0 || !currentItem) {
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
