/* eslint-env jest */
import {shallow} from 'enzyme'
import React from 'react'

import ConnectedLogin from './container'
const Login = ConnectedLogin.WrappedComponent

import * as AstroIntegration from '../../utils/astro-integration'

describe('The Login', () => {
    test('Should render tab if not running in Astro', () => {
        AstroIntegration.isRunningInAstro = false
        const route = {
            route: 'register'
        }
        const login = shallow(<Login route={route} />)
        expect(login.find('TabsPanel')).toHaveLength(2)
    })

    test('Should not render tabs at all if running in an Astro app', () => {
        AstroIntegration.isRunningInAstro = true
        const route = {
            route: 'signin'
        }
        const login = shallow(<Login route={route} />)
        expect(login.find('TabsPanel')).toHaveLength(0)
    })
})
