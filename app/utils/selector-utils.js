import {createSelector, createSelectorCreator, defaultMemoize} from 'reselect'
import Immutable from 'immutable'

export const createImmutableComparingSelector = createSelectorCreator(
    defaultMemoize,
    Immutable.is
)

export const selectorToJS = (selector) => createImmutableComparingSelector(
    selector,
    (raw) => raw.toJS()
)

export const createToJSSelector = (...args) => selectorToJS(createSelector(...args))

export const createGetSelector = (selector, key) => createSelector(
    selector,
    (obj) => obj.get(key)
)
