import {createSelector} from 'reselect'

/**
 * Creates a selector that gets a value from a selected Immutable object.
 *
 * @param {function} selector - A selector returning an Immutable object
 * @param {string|number|function} key - The key to be looked up on
 *   the Immutable object. If a function is passed it is treated as a
 *   selector returning the desired key.
 * @param {*} [defaultValue] - An optional value to be returned if the
 *   key does not exist in the Immutable object.
 * @returns {function}
 */
export const createGetSelector = (selector, key, defaultValue) => {
    if (typeof key === 'function') {
        return createSelector(
            selector,
            key,
            (obj, keyValue) => obj.get(keyValue, defaultValue)
        )
    }
    return createSelector(
        selector,
        (obj) => obj.get(key, defaultValue)
    )
}

export const invertSelector = (selector) => createSelector(
    selector,
    (bool) => !bool
)

/**
 * Creates a selector that checks whether a key exists in a selected
 * Immutable object.
 *
 * @param {function} selector - A selector returning an Immutable object
 * @param {string|number|function} key - The key to be checked on
 *   the Immutable object. If a function is passed it is treated as a
 *   selector returning the desired key.
 * @returns {function}
 */
export const createHasSelector = (selector, key) => {
    if (typeof key === 'function') {
        return createSelector(
            selector,
            key,
            (obj, keyValue) => obj.has(keyValue)
        )
    }
    return createSelector(
        selector,
        (obj) => obj.has(key)
    )
}
