/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jest */
import {submitRegisterForm} from './actions'
import Immutable from 'immutable'

jest.mock('../../integration-manager/checkout/commands')
import {updateShippingAndBilling} from '../../integration-manager/checkout/commands'
jest.mock('../../integration-manager/login/commands')
import {registerUser} from '../../integration-manager/login/commands'
jest.mock('../app/actions')
import {addNotification} from '../app/actions'
import {CONFIRMATION_FORM_NAME} from '../../store/form/constants'

describe('submitRegisterForm', () => {
    const mockDispatch = jest.fn()
    mockDispatch.mockImplementation((...args) => args[0])

    const mockGetState = () => ({
        checkout: Immutable.fromJS({
            email: 'test@email.com',
            shipping: {
                address: {
                    firstname: 'test',
                    lastname: 'test'
                }
            }
        }),
        form: {
            [CONFIRMATION_FORM_NAME]: {
                values: {
                    password: 'Test'
                }
            }
        }
    })

    test('shows a notification on error', () => {
        registerUser.mockClear()
        registerUser.mockImplementationOnce(() => Promise.reject('Test error'))
        const thunk = submitRegisterForm()
        expect(typeof thunk).toBe('function')

        return thunk(mockDispatch, mockGetState)
            .then(() => {
                expect(mockDispatch).toBeCalled()
                expect(addNotification).toBeCalled()
            })
    })

    test('calls updateShippingAndBilling on success', () => {
        registerUser.mockClear()
        registerUser.mockImplementationOnce(() => Promise.resolve())
        const thunk = submitRegisterForm()
        expect(typeof thunk).toBe('function')

        return thunk(mockDispatch, mockGetState)
            .then(() => {
                expect(mockDispatch).toBeCalled()
                expect(updateShippingAndBilling).toBeCalled()
            })
    })
})
