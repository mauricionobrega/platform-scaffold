import {createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import rootReducer from '../containers/reducers'

const configureStore = (initialState) => {
    const middlewares = [
        thunk
    ]

    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middlewares),
            window.devToolsExtension ? window.devToolsExtension() : undefined
        )
    )

    return store
}

export default configureStore
