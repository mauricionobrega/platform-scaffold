import {shallow} from 'enzyme'
import React from 'react'

import {RawHeader as Header, generateCartCounterBadge} from './container'
import Badge from 'progressive-web-sdk/dist/components/badge'

describe('The cart badge', () => {

    test('Should not be visible with no items in the cart', () => {
        const result = generateCartCounterBadge({summary_count: 0})
        expect(result.type).not.toBe(Badge)
    })

    test('Should not be visible if passed incomplete object', () => {
        const result = generateCartCounterBadge()
        expect(result.type).not.toBe(Badge)
    })

    test('Should be visible and accurate if there are items in the cart', () => {
        const oneItemResult = generateCartCounterBadge({summary_count: 1})
        expect(oneItemResult.type).toBe(Badge)
        expect(oneItemResult.props.children).toBe(1)
        expect(oneItemResult.props.title).toMatch(/1/)

        const twoItemsResult = generateCartCounterBadge({summary_count: 2})
        expect(twoItemsResult.type).toBe(Badge)
        expect(twoItemsResult.props.children).toBe(2)
        expect(twoItemsResult.props.title).toMatch(/2/)
    })
})

describe('The header', () => {
    test('Should not render header at all if running in an Astro app', () => {
        const header = shallow(<Header isRunningInAstro={true} />)
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
