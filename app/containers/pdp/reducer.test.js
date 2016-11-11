import {Map, is} from 'immutable'

import reducer from './reducer'

import * as appActions from '../app/actions'
import * as pdpActions from './actions'

jest.mock('./parsers/pdp')
import pdpParser from './parsers/pdp'

test('unknown action type leaves state unchanged', () => {
    const action = {
        type: 'qwertyuiop'
    }
    const inputState = Map({
        test: true,
        item: false,
    })

    expect(reducer(inputState, action)).toEqual(inputState)
})

test('appActions.onPageReceived does nothing when pageType !== PDP', () => {
    const action = appActions.onPageReceived($, $(), 'Home')
    const inputState = Map()

    expect(reducer(inputState, action)).toEqual(inputState)
})

test('appActions.onPageReceived sets contentsLoaded to true', () => {
    const action = appActions.onPageReceived($, $(), 'PDP')
    const inputState = Map()

    expect(reducer(inputState, action).get('contentsLoaded')).toBe(true)
})

test('appActions.onPageReceived causes the page to be parsed into the state', () => {
    const $html = $('<body><hr /></body')
    const action = appActions.onPageReceived($, $html, 'PDP')
    const inputState = Map()

    pdpParser.mockClear()
    const parsedPage = {test: true, product: {title: 'Parsed Product'}}
    pdpParser.mockReturnValueOnce(parsedPage)

    const result = reducer(inputState, action)

    expect(pdpParser).toBeCalledWith($, $html)
    expect(result.get('test')).toBe(true)
    expect(is(result.get('product'), Map(parsedPage.product))).toBe(true)
})

test('pdpActions.setItemQuantity sets the item quantity', () => {
    const action = pdpActions.setItemQuantity(5)
    const inputState = Map({itemQuantity: 2})

    expect(is(reducer(inputState, action), Map({itemQuantity: 5}))).toBe(true)
})