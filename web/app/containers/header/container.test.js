import {shallow} from 'enzyme'
import React from 'react'

import {RawHeader as Header} from './container'
import Badge from 'progressive-web-sdk/dist/components/badge'

describe('The header', () => {
    test('Should not render header at all if running in an Astro app', () => {
        const headerData = {
            toJS: () => {
                return {
                    isCollapsed: true,
                    cart: []
                }
            }
        }

        const header = shallow(<Header isRunningInAstro={true} header={headerData} />)
        expect(header.children().length).toBe(0)
    })

    test('Should render header if not running in an Astro app', () => {
        const headerData = {
            toJS: () => {
                return {
                    isCollapsed: false,
                    cart: []
                }
            }
        }

        const header = shallow(<Header isRunningInAstro={false} header={headerData} />)
        expect(header.children().length).not.toBe(0)
    })
})
