import {mount, shallow} from 'enzyme'
import React from 'react'

import SpeechToText from './index.jsx'

test('SpeechToText renders without errors', () => {
    const wrapper = mount(<SpeechToText />)
    expect(wrapper.length).toBe(1)
})

/* eslint-disable newline-per-chained-call */
test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<SpeechToText />)
    wrapper.setState({canRecord: true})

    expect(wrapper.hasClass('c-speech-to-text')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<SpeechToText />)
    wrapper.setState({canRecord: true})

    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    [
        'test',
        'test another'
    ].forEach((name) => {
        const wrapper = shallow(<SpeechToText className={name} />)
        wrapper.setState({canRecord: true})

        expect(wrapper.hasClass(name)).toBe(true)
    })
})
