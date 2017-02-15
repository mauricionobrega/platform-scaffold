/* eslint-env jest */
import {shallow} from 'enzyme'
import React from 'react'

import Footer from './container'

describe('The footer', () => {
    test('Should not render footer at all if running in an Astro app', () => {
        const footer = shallow(<Footer isRunningInAstro={true} />)
        expect(footer.children().length).toBe(0)
    })

    test('Should render footer if not running in an Astro app', () => {
        const footerData = {
            get: (key) => {
                return {key}
            }
        }

        const footer = shallow(<Footer isRunningInAstro={false} footer={footerData} />)
        expect(footer.children().length).not.toBe(0)
    })
})
