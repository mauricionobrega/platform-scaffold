import {createSelector, createSelectorCreator, defaultMemoize} from 'reselect'
import Immutable from 'immutable'

export const createImmutableComparingSelector = createSelectorCreator(
    defaultMemoize,
    Immutable.is
)

export const createToJSSelector = (...args) => createImmutableComparingSelector(
    createSelector(...args),
    (raw) => raw.toJS()
)
