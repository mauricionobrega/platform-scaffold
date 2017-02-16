/* eslint-env jest */
import {shallow} from 'enzyme'
import React from 'react'

import {RawLogin as Login} from './container'

describe('The Login', () => {
    test('Should render tab if not running in Astro', () => {
        const route = {
            route: 'register'
        }
        const login = shallow(<Login isRunningInAstro={false} route={route} />)
        console.log(login.children())
        expect(login.children().length).toBe(2)
    })

    test('Should not render tabs at all if running in an Astro app', () => {
        const route = {
            route: 'signin'
        }
        const login = shallow(<Login isRunningInAstro={true} route={route} />)
        console.log(login.children())
        expect(login.children().length).toBe(0)
    })
})
