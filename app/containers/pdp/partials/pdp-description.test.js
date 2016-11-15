import React from 'react'
import PDPDescription from './pdp-description'
import {mount, shallow} from 'enzyme'
import {Accordion, AccordionItem} from 'progressive-web-sdk/dist/components/accordion'

/* eslint-disable newline-per-chained-call */

test('renders without errors', () => {
    const wrapper = mount(<PDPDescription />)

    expect(wrapper.length).toBe(1)
})

const ROOT_CLASS = 'c-pdp-description'

test('renders the component class correctly', () => {
    const wrapper = shallow(<PDPDescription />)

    expect(wrapper.hasClass(ROOT_CLASS)).toBe(true)
})

test('renders the description in an AccordionItem', () => {
    const wrapper = shallow(<PDPDescription description="The text that we text is text" />)

    const accordion = wrapper
    expect(accordion.type()).toBe(Accordion)

    expect(accordion.children().length).toBe(1)
    const accordionItem = accordion.children().first()
    expect(accordionItem.type()).toBe(AccordionItem)

    expect(accordionItem.prop('header')).toBe('Product Description')
    expect(accordionItem.html().includes('The text that we text is text')).toBe(true)
})
