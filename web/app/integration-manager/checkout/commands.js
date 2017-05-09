let connector = {}

export const register = (commands) => {
    connector = commands
}

export const initCheckoutShippingPage = (...args) => connector.initCheckoutShippingPage(...args)
export const submitShipping = (...args) => connector.submitShipping(...args)
export const checkCustomerEmail = (...args) => connector.checkCustomerEmail(...args)
export const checkoutSignIn = (...args) => connector.checkoutSignIn(...args)
export const fetchShippingMethodsEstimate = (...args) => connector.fetchShippingMethodsEstimate(...args)
export const initCheckoutPaymentPage = (...args) => connector.initCheckoutPaymentPage(...args)
export const submitPayment = (...args) => connector.submitPayment(...args)
export const initCheckoutConfirmationPage = (...args) => connector.initCheckoutConfirmationPage(...args)
export const checkoutRegister = (...args) => connector.checkoutRegister(...args)
export const updatingShippingAndBilling = (...args) => connector.updatingShippingAndBilling(...args)
