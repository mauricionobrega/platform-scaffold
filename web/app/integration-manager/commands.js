/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {register as registerHome} from './home/commands'
import {register as registerProducts} from './products/commands'
import {register as registerCategories} from './categories/commands'
import {register as registerCart} from './cart/commands'
import {register as registerApp} from './app/commands'
import {register as registerCheckout} from './checkout/commands'
import {register as registerLogin} from './login/commands'

let connector = {}

export const register = (commands) => {
    connector = commands
    registerApp(commands.app)
    registerHome(commands.home)
    registerProducts(commands.products)
    registerCategories(commands.categories)
    registerCart(commands.cart)
    registerCheckout(commands.checkout)
    registerLogin(commands.login)
}

export const submitNewsletter = (...args) => connector.submitNewsletter(...args)
export const getSearchSuggestions = (...args) => connector.getSearchSuggestions(...args)
