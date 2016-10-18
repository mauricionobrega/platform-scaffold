// THIS IS A GENERATED FILE, DO NOT EDIT

import {combineReducers} from 'redux'

import app from './app/reducer'
import home from './home/reducer'
import login from './login/reducer'
import pdp from './pdp/reducer'
import plp from './plp/reducer'
import {reducer as formReducer} from 'redux-form'


const rootReducer = combineReducers({
    app,
    home,
    login,
    pdp,
    plp,
    form: formReducer,
    
})

export default rootReducer
