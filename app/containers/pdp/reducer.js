import {createReducer} from 'redux-act'
import Immutable from 'immutable'
import pdpParser from './parsers/pdp'
import {onPageReceived, onRouteChanged} from '../app/actions'
import * as pdpActions from './actions'
import {getComponentType} from '../../utils/utils'
import {PDP} from './container'

const initialState = Immutable.fromJS({
    contentsLoaded: false,
    itemQuantity: 1,
    itemAddedModalOpen: false,
    quantityAdded: 0,
    product: {
        title: '',
        price: '',
        description: '',
        carouselItems: []
    }
})

export default createReducer({
    [onPageReceived]: (state, {$, $response, pageComponent}) => {
        if (getComponentType(pageComponent) !== PDP) {
            return state
        }
        return state.mergeDeep({
            contentsLoaded: true,
            ...pdpParser($, $response)
        })
    },
    [onRouteChanged]: (state) => {
        return initialState
    },
    [pdpActions.setItemQuantity]: (state, payload) => {
        return state.set('itemQuantity', payload)
    },
    [pdpActions.openItemAddedModal]: (state) => {
        return state.mergeDeep({
            itemAddedModalOpen: true,
            quantityAdded: state.get('itemQuantity')
        })
    },
    [pdpActions.closeItemAddedModal]: (state) => {
        return state.mergeDeep({
            itemAddedModalOpen: false
        })
    }
}, initialState)
