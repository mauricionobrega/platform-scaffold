// THIS IS A GENERATED FILE, DO NOT EDIT

import {combineReducers} from 'redux'

import app from './app/reducer'
import footer from './footer/reducer'
import header from './header/reducer'
import home from './home/reducer'
import login from './login/reducer'
import plp from './plp/reducer'
import {reducer as formReducer} from 'redux-form'


const rootReducer = combineReducers({
    app,
    footer,
    header,
    home,
    login,
    plp,
    form: formReducer,
})

export default rootReducer
