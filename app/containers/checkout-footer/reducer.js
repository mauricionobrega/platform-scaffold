import Immutable from 'immutable'
import {createReducer} from 'redux-act'
// import * as appActions from '../app/actions'

export const initialState = Immutable.fromJS({
    newsletter: null,
    navigation: new Array(5).fill({
        title: null,
        href: null
    }),
})

const footer = createReducer({

}, initialState)


export default footer
