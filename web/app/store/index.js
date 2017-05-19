/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import rootReducer from '../containers/reducers'
import userReducer from './user/reducer'
import cartReducer from './cart/reducer'
import categoryReducer from './categories/reducer'
import modalReducer from 'progressive-web-sdk/dist/store/modals/reducer'
import productReducer from './products/reducer'
import checkoutReducer from './checkout/reducer'
import {reducer as imReducer} from '../integration-manager/reducer'
import {reducer as formReducer} from 'redux-form'

import analytics from 'redux-analytics'
import analyticsManager from 'progressive-web-sdk/dist/analytics/analytics-manager'

const noop = (f) => f

analyticsManager.init({
    projectSlug: AJS_SLUG,              // eslint-disable-line no-undef
    mobifyGAID: 'UA-53825302-1',
    ecommerceLibrary: 'ec',
    debug: true
})

const configureStore = (initialState) => {
    const middlewares = [
        analytics(({type, payload}, state) => analyticsManager.distribute(type, payload, state)),
        thunk
    ]
    const reducer = combineReducers({
        categories: categoryReducer,
        cart: cartReducer,
        ui: rootReducer,
        user: userReducer,
        modals: modalReducer,
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
