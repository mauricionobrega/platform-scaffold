import {Map, is} from 'immutable'

import reducer from './reducer'

import * as appActions from '../app/actions'
import * as registrationActions from './actions'

jest.mock('./parsers/registration')
import registrationParser from './parsers/registration'

test('unknown action type leaves state unchanged', () => {
    const action = {
        type: 'qwertyuiop'
    }
    const inputState = Map({
        test: true,
        item: false,
    })

    expect(reducer(inputState, action)).toBe(inputState)
})

test('appActions.onPageReceived does nothing when pageType !== Registration', () => {
    const action = appActions.onPageReceived($, $(), 'Home')
    const inputState = Map()

    expect(reducer(inputState, action)).toEqual(inputState)
})

test('appActions.onPageReceived sets loaded to true', () => {
    const action = appActions.onPageReceived($, $(), 'Registration')
    const inputState = Map()

    expect(reducer(inputState, action).get('loaded')).toBe(true)
})

test('appActions.onPageReceived causes the page to be parsed into the state', () => {
    const $html = $('<body><hr /></body')
    const action = appActions.onPageReceived($, $html, 'Registration')
    const inputState = Map()

    registrationParser.mockClear()
    const parsedPage = {test: true, title: 'Customer Login', loaded: true}
    registrationParser.mockReturnValueOnce(parsedPage)

    const result = reducer(inputState, action)

    expect(registrationParser).toBeCalledWith($, $html)
    expect(result.get('test')).toBe(true)
    expect(is(result, Map(parsedPage))).toBe(true)
})

test('registrationActions.openInfoModal opens the info modal', () => {
    const action = registrationActions.openInfoModal()
    const inputState = Map()

    expect(is(reducer(inputState, action), Map({infoModalOpen: true}))).toBe(true)
})

test('registrationActions.closeInfoModal closes the info modal', () => {
    const action = registrationActions.closeInfoModal()
    const inputState = Map({infoModalOpen: true})

    expect(is(reducer(inputState, action), Map({infoModalOpen: false}))).toBe(true)
})
