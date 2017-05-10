let connector = {}

export const register = (commands) => {
    connector = commands
}

/**
 * Initializes any required data for the Checkout Shipping page
 */
export const initCheckoutShippingPage = (url, routeName) => connector.initCheckoutShippingPage(url, routeName)

/**
 * Initializes any required data for the Checking Payment page
 */
export const initCheckoutPaymentPage = (url, routeName) => connector.initCheckoutPaymentPage(url, routeName)

/**
 * Initializes any required data for the Checkout Confirmation page
 */
export const initCheckoutConfirmationPage = (url, routeName) => connector.initCheckoutConfirmationPage(url, routeName)

export const submitShipping = (formValues) => connector.submitShipping(formValues)
export const fetchShippingMethodsEstimate = (formName) => connector.fetchShippingMethodsEstimate(formName)
export const updatingShippingAndBilling = (...args) => connector.updatingShippingAndBilling(...args)

/**
 * TODO: Do we really need this one? Seems the only difference is what happens _AFTER_
 * we are signed in, which we could handle in the UI action and not in the connector
 */
export const checkoutSignIn = (...args) => connector.checkoutSignIn(...args)

/**
 * TODO: Do we really need this one? Seems the only difference is what happens _AFTER_
 * we register, which we could handle in the UI action and not in the connector
 */
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
