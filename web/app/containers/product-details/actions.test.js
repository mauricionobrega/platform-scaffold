/* eslint-env jest */
import Immutable from 'immutable'

import {addToCartStarted, submitCartForm} from './actions'


import * as commands from '../../integration-manager/commands'

/* eslint-disable import/namespace */
beforeAll(() => {
})

afterAll(() => {
})

test('submitCartForm makes a request and dispatches updates', () => {
    const formKeyValue = '12345'
    document.cookie = `form_key=${formKeyValue}`
    const thunk = submitCartForm()
    expect(typeof thunk).toBe('function')

    const getStore = () => ({
        ui: {
            app: Immutable.fromJS({currentURL: 'https://test.mobify.com/'}),
            productDetails: Immutable.fromJS({
                '/': {
                    contentsLoaded: true,
                    formInfo: {
                        method: 'POST',
                        hiddenInputs: {},
                        submitUrl: 'submitUrl'
                    },
                    itemQuantity: 1
                }
            })
        }
    })

    commands.addToCart = jest.fn()
    const mockDispatch = jest.fn()
    thunk(mockDispatch, getStore)

    expect(mockDispatch).toBeCalled()
    expect(mockDispatch.mock.calls[0][0])
        .toEqual(addToCartStarted())
    expect(mockDispatch.mock.calls[1][0])
        .toEqual(commands.addToCart())
})
