/* eslint-env jest */
import {mount} from 'enzyme'
import React from 'react'
import {Provider} from 'react-redux'

import OfflineBanner from './partials/offline-banner'
import OfflineModal from './partials/offline-modal'

// Avoid errors with accessing state that does not exist (within `OfflineModal`)
jest.mock('reselect')

const store = {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => ({})
}

test('OfflineBanner renders without errors', () => {
    const wrapper = mount(
        <Provider store={store}>
            <OfflineBanner />
        </Provider>)

    expect(wrapper.length).toBe(1)
})

test('OfflineModal renders without errors', () => {
    const wrapper = mount(
        <Provider store={store}>
            <OfflineModal isOpen={false} reload={() => {}} />
        </Provider>)

    expect(wrapper.length).toBe(1)
})
