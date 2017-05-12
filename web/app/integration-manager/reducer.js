let connectorReducer

export const register = (reducer) => {
    connectorReducer = reducer
}

export const reducer = (state, action) => connectorReducer(state, action)
