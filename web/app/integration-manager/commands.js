import {register as registerHome} from './home/commands'

let connector = {}

export const register = (commands) => {
    connector = commands

    registerHome(commands.home)
}

export const fetchPdpData = (...args) => connector.fetchPdpData(...args)

export const addToCart = (...args) => connector.addToCart(...args)

export const fetchCheckoutShippingData = (...args) => connector.fetchCheckoutShippingData(...args)

export const submitShipping = (...args) => connector.submitShipping(...args)

export const checkCustomerEmail = (...args) => connector.checkCustomerEmail(...args)

export const submitSignIn = (...args) => connector.submitSignIn(...args)
