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

/**
 * Checks to see if a given email is available for registration.
 * Connectors my choose to not implement this in which case they can simply
 * return `new Promise(true)` (which means the email is available and not in use)
 * @param {string} email The email to check
 * @return {boolean} `true` if the email is available, `false` if the email is associated with an existing account
 */
export const isEmailAvailable = (email) => connector.isEmailAvailable(email)

export const submitPayment = (...args) => connector.submitPayment(...args)
