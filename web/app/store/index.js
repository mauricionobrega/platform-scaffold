import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import rootReducer from '../containers/reducers'
import catalogReducer from '../containers/catalog/reducer'
import modalReducer from './modals/reducer'
import categoryReducer from './categories/reducer'
import {reducer as formReducer} from 'redux-form'

const noop = (f) => f

const reducer = combineReducers({
    catalog: catalogReducer,
    categories: categoryReducer,
    ui: rootReducer,
    modals: modalReducer,
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
