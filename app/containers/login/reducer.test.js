import {Map, is} from 'immutable'

import reducer from './reducer'
import Login from './container'
import Home from '../home/container'

import {getComponentType} from '../../utils/utils'

import * as appActions from '../app/actions'

jest.mock('./parsers/signin')
import signinParser from './parsers/signin'

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

test('appActions.onPageReceived does nothing when pageComponent !== Login', () => {
    const action = appActions.onPageReceived($, $(), getComponentType(Home))
    const inputState = Map()

    expect(reducer(inputState, action)).toEqual(inputState)
})

test('appActions.onPageReceived does nothing when pageComponent !== Login and different route name', () => {
    const action = appActions.onPageReceived($, $(), getComponentType(Home), null, null, 'productListPage')
    const inputState = Map()

    expect(reducer(inputState, action)).toEqual(inputState)
})

test('appActions.onPageReceived sets loaded to true', () => {
    const inputState = Map({
        signinSection: Map({}),
        registerSection: Map({})
    })

    const signinAction = appActions.onPageReceived($, $(), getComponentType(Login), null, null, 'signin')
    expect(reducer(inputState, signinAction).get('loaded')).toBe(true)

    const registerAction = appActions.onPageReceived($, $(), getComponentType(Login), null, null, 'register')
    expect(reducer(inputState, registerAction).get('loaded')).toBe(true)
})

test('appActions.onPageReceived causes the page to be parsed into the state', () => {
    const $html = $('<body><hr /></body')
    const action = appActions.onPageReceived($, $html, getComponentType(Login), null, null, 'signin')
    const inputState = Map({
        signinSection: Map({})
    })

    signinParser.mockClear()
    const parsedPage = {test: true, title: 'Customer Login'}
    signinParser.mockReturnValueOnce(parsedPage)

    const result = reducer(inputState, action)

    expect(signinParser).toBeCalledWith($, $html)
    expect(result.get('signinSection').get('test')).toBe(true)
    expect(is(result, Map({signinSection: Map({...parsedPage}), loaded: true}))).toBe(true)
})
