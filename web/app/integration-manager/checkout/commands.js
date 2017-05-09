let connector = {}

export const register = (commands) => {
    connector = commands
}

export const initCheckoutShippingPage = (url, routeName) => connector.initCheckoutShippingPage(url, routeName)
export const initCheckoutPaymentPage = (url, routeName) => connector.initCheckoutPaymentPage(url, routeName)
export const initCheckoutConfirmationPage = (url, routeName) => connector.initCheckoutConfirmationPage(url, routeName)

export const submitShipping = (formValues) => connector.submitShipping(formValues)
export const fetchShippingMethodsEstimate = (formName) => connector.fetchShippingMethodsEstimate(formName)
export const updatingShippingAndBilling = (...args) => connector.updatingShippingAndBilling(...args)

export const checkoutSignIn = (...args) => connector.checkoutSignIn(...args)
export const checkoutRegister = (...args) => connector.checkoutRegister(...args)
export const checkCustomerEmail = (...args) => connector.checkCustomerEmail(...args)

export const submitPayment = (...args) => connector.submitPayment(...args)
