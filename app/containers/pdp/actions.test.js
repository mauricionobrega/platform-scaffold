import Immutable from 'immutable'

import {openItemAddedModal, submitCartForm} from './actions'

import * as utils from '../../utils/utils'

jest.mock('../cart/actions')
import {getCart} from '../cart/actions'

/* eslint-disable import/namespace */
let realMakeFormEncodedRequest
beforeAll(() => {
    realMakeFormEncodedRequest = utils.makeFormEncodedRequest
    utils.makeFormEncodedRequest = jest.fn()
    utils.makeFormEncodedRequest.mockReturnValue(Promise.resolve())
})

afterAll(() => {
    utils.makeFormEncodedRequest = realMakeFormEncodedRequest
})

test('submitCartForm makes a request and dispatches updates', () => {
    const thunk = submitCartForm()
    expect(typeof thunk).toBe('function')

    const getStore = () => ({ui: {pdp: {
        get: () => {
            return Immutable.fromJS({
                contentsLoaded: true,
                formInfo: {
                    method: 'POST',
                    hiddenInputs: {},
                    submitUrl: 'submitUrl'
                },
                itemQuantity: 1
            })
        }
    }}})

    const mockDispatch = jest.fn()
    return thunk(mockDispatch, getStore)
        .then(() => {
            expect(utils.makeFormEncodedRequest).toBeCalledWith(
                'submitUrl',
                {qty: 1},
                {method: 'POST'})

            expect(mockDispatch).toBeCalled()
            expect(mockDispatch.mock.calls[0][0])
                .toEqual(openItemAddedModal())
            expect(getCart).toBeCalled()
        })
})
