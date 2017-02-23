import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import rootReducer from '../containers/reducers'
import cartReducer from './cart/reducer'
import categoryReducer from './categories/reducer'
import modalReducer from './modals/reducer'
import productReducer from './products/reducer'
import checkoutReducer from './checkout/reducer'
import imReducer from '../integration-manager/reducer'
import {reducer as formReducer} from 'redux-form'

const noop = (f) => f

const reducer = combineReducers({
    categories: categoryReducer,
    cart: cartReducer,
    ui: rootReducer,
    modals: modalReducer,
    products: productReducer,
    checkout: checkoutReducer,
    integrationManager: imReducer,
    form: formReducer
})

const configureStore = (initialState) => {
    const middlewares = [
        thunk
    ]

    const store = createStore(
        reducer,
        initialState,
        compose(
            applyMiddleware(...middlewares),
            window.devToolsExtension ? window.devToolsExtension() : noop
        )
    )

    return store
}

export default configureStore
