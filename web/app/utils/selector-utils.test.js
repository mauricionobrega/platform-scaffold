/* eslint-env jest */
import Immutable from 'immutable'

import {createGetSelector, invertSelector, createHasSelector} from './selector-utils'

describe('createGetSelector', () => {
    test('creates selectors that get the string key from the input map', () => {
        const contentsSelector = ({contents}) => contents

        const getSelector = createGetSelector(contentsSelector, 'key')

        const state = {
            contents: Immutable.Map({
                key: 'value',
                bystander: 'intervention'
            })
        }

        expect(getSelector(state)).toBe('value')
    })

    test('creates selectors that get the integer key from the input list', () => {
        const contentsSelector = ({contents}) => contents

        const getSelector = createGetSelector(contentsSelector, 1)

        const state = {
            contents: Immutable.List(['zeroth', 'first'])
        }

        expect(getSelector(state)).toBe('first')
    })

    test('creates selectors that return a default value if a key is not found', () => {
        const contentsSelector = ({contents}) => contents

        const getSelector = createGetSelector(contentsSelector, 'key', 'key not found')

        const state = {
            contents: Immutable.Map({
                irrelevant: 'nonsense'
            })
        }

        expect(getSelector(state)).toBe('key not found')
    })

    test('creates selectors that use a selector for the key if one is passed', () => {
        const contentsSelector = ({contents}) => contents
        const keySelector = ({key}) => key

        const getSelector = createGetSelector(contentsSelector, keySelector, 'key not found')

        const contents = Immutable.Map({
            present: 'and accounted for'
        })

        const state1 = {
            contents,
            key: 'present'
        }

        const state2 = {
            contents,
            key: 'absent'
        }

        expect(getSelector(state1)).toBe('and accounted for')
        expect(getSelector(state2)).toBe('key not found')
    })
})

describe('invertSelector', () => {
    test('creates selectors that return the inverse of the input selector', () => {
        const originalSelector = ({isFirst}) => isFirst
        const inverseSelector = invertSelector(originalSelector)

        const state1 = {
            isFirst: true
        }

        const state2 = {
            isFirst: false
        }

        expect(inverseSelector(state1)).toBe(false)
        expect(inverseSelector(state2)).toBe(true)
    })
})

describe('createHasSelector', () => {
    test('creates selectors that check for a string key in the input map', () => {
        const contentsSelector = ({contents}) => contents

        const hasSelector = createHasSelector(contentsSelector, 'key')

        const state1 = {
            contents: Immutable.Map({
                key: 'value',
            })
        }

        const state2 = {
            contents: Immutable.Map({
                noKey: 'no value'
            })
        }

        expect(hasSelector(state1)).toBe(true)
        expect(hasSelector(state2)).toBe(false)
    })

    test('creates selectors that check for an integer key in the input list', () => {
        const contentsSelector = ({contents}) => contents

        const hasSelector = createHasSelector(contentsSelector, 1)

        const state1 = {
            contents: Immutable.List(['zeroth', 'first'])
        }

        const state2 = {
            contents: Immutable.List(['zeroth'])
        }
        expect(hasSelector(state1)).toBe(true)
        expect(hasSelector(state2)).toBe(false)
    })

    test('creates selectors that use a selector for the key if one is passed', () => {
        const contentsSelector = ({contents}) => contents
        const keySelector = ({key}) => key

        const hasSelector = createHasSelector(contentsSelector, keySelector)

        const contents = Immutable.Map({
            present: 'and accounted for'
        })

        const state1 = {
            contents,
            key: 'present'
        }

        const state2 = {
            contents,
            key: 'absent'
        }

        expect(hasSelector(state1)).toBe(true)
        expect(hasSelector(state2)).toBe(false)
    })
})
