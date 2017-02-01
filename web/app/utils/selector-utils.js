import {createSelector, createSelectorCreator, defaultMemoize} from 'reselect'
import Immutable from 'immutable'

export const createImmutableComparingSelector = createSelectorCreator(
    defaultMemoize,
    Immutable.is
)

export const selectorToJS = (selector) => createImmutableComparingSelector(
    selector,
    (raw) => { return raw ? raw.toJS() : null }
)

export const createToJSSelector = (...args) => selectorToJS(createSelector(...args))

export const createGetSelector = (selector, key, defaultValue) => createSelector(
    selector,
    (obj) => obj.get(key, defaultValue)
)

export const invertSelector = (selector) => createSelector(
    selector,
    (bool) => !bool
)

export const createHasSelector = (selector, key) => createSelector(
    selector,
    (obj) => obj.has(key)
)
