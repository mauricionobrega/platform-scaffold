import {combineReducers} from 'redux'

import products from './products/reducer'

const catalogReducer = combineReducers({
    products
})

export default catalogReducer
