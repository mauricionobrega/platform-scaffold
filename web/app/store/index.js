/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import rootReducer from '../containers/reducers'
import cartReducer from './cart/reducer'
import categoryReducer from './categories/reducer'
import modalReducer from 'progressive-web-sdk/dist/store/modals/reducer'
import notificationsReducer from 'progressive-web-sdk/dist/store/notifications/reducer'
import productReducer from './products/reducer'
import checkoutReducer from './checkout/reducer'
import {reducer as imReducer} from '../integration-manager/reducer'
import {reducer as formReducer} from 'redux-form'

import analytics from 'redux-analytics'
import {analyticManager} from 'progressive-web-sdk/dist/analytics/analytic-manager'

const noop = (f) => f


const configureStore = (initialState) => {
    const middlewares = [
        thunk,
        analytics(({type, payload}, state) => analyticManager.distribute(type, payload, state))
    ]

    const reducer = combineReducers({
        categories: categoryReducer,
        cart: cartReducer,
        ui: rootReducer,
        modals: modalReducer,
        notifications: notificationsReducer,
        products: productReducer,
        checkout: checkoutReducer,
        integrationManager: imReducer,
        form: formReducer
    })

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
