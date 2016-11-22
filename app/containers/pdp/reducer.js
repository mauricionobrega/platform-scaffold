import Immutable from 'immutable'
import PDP from './container'
import pdpParser from './parsers/pdp'
import * as pdpActions from './actions'
import {createRoutedReducer, getRoutedState, getSelectorFromState} from '../../utils/router-utils'

const initialState = Immutable.Map({
    isPlaceholder: true,
    itemQuantity: 1,
    itemAddedModalOpen: false,
    quantityAdded: 0,
    product: Immutable.Map({
        title: '',
        price: '',
        description: '',
        carouselItems: []
    })
})

const pdpReducers = {
    [pdpActions.setItemQuantity]: (state, payload) => {
        const routedState = getRoutedState(state)
        const selector = getSelectorFromState(state)
        return state.set(selector, routedState.set('itemQuantity', payload))
    },
    [pdpActions.openItemAddedModal]: (state) => {
        const routedState = getRoutedState(state)
        const selector = getSelectorFromState(state)
        return state.set(selector, routedState.mergeDeep({
            itemAddedModalOpen: true,
            quantityAdded: routedState.get('itemQuantity')
        }))
    },
    [pdpActions.closeItemAddedModal]: (state) => {
        const routedState = getRoutedState(state)
        const selector = getSelectorFromState(state)
        return state.set(selector, routedState.set('itemAddedModalOpen', false))
    }
}

export default createRoutedReducer(PDP, pdpParser, initialState, pdpReducers)
