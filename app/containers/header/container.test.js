import {generateCartCounterBadge} from './container'
import Badge from '../../components/badge'

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

        const twoItemsResult = generateCartCounterBadge({summary_count: 2})
        expect(twoItemsResult.type).toBe(Badge)
        expect(twoItemsResult.props.children).toBe(2)
    })
})
