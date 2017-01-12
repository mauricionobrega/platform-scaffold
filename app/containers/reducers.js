// THIS IS A GENERATED FILE, DO NOT EDIT

import {combineReducers} from 'redux'

import app from './app/reducer'
import catalog from './catalog/reducer'
import cart from './cart/reducer'
import checkoutConfirmation from './checkout-confirmation/reducer'
import checkoutPayment from './checkout-payment/reducer'
import checkoutShipping from './checkout-shipping/reducer'
import footer from './footer/reducer'
import header from './header/reducer'
import home from './home/reducer'
import login from './login/reducer'
import miniCart from './mini-cart/reducer'
import navigation from './navigation/reducer'
import pdp from './pdp/reducer'
import plp from './plp/reducer'
// import {reducer as formReducer} from 'redux-form'


const rootReducer = combineReducers({
    app,
    catalog,
    cart,
    checkoutConfirmation,
    checkoutPayment,
    checkoutShipping,
    footer,
    header,
    home,
    login,
    miniCart,
    navigation,
    pdp,
    plp,
    // form: formReducer,

})

export default rootReducer
