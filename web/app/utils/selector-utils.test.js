import Immutable from 'immutable'
import {createSelector} from 'reselect'

import {createToJSSelector} from './selector-utils'

test('Creates identical JS objects when the Immutable objects don\'t change', () => {
    const rootSelector = (state) => state
    const selector = createToJSSelector(
        rootSelector,
        ({contents}) => contents
    )

    const referenceSelector = createSelector(
        rootSelector,
        ({contents}) => contents.toJS()
    )

    const state1 = {
        contents: Immutable.List([1, 2, 3])
    }

    const state2 = {
        contents: Immutable.List([1, 2]).push(3)
    }

    expect(state1.contents).not.toBe(state2.contents)
    expect(Immutable.is(state1.contents, state2.contents)).toBe(true)

    expect(referenceSelector(state1)).not.toBe(referenceSelector(state2))
    expect(selector(state1)).toBe(selector(state2))
})
