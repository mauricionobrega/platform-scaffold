/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

let connector = {}

export const register = (commands) => {
    connector = commands
}

/**
 * Initializes any required data for the Checkout Shipping page
 * @param {string} url The url of the current page
 * @param {string} routeName The route name of the current page
 */
export const initCheckoutShippingPage = (url, routeName) => connector.initCheckoutShippingPage(url, routeName)

/**
 * Initializes any required data for the Checking Payment page
 * @param {string} url The url of the current page
 * @param {string} routeName The route name of the current page
 */
export const initCheckoutPaymentPage = (url, routeName) => connector.initCheckoutPaymentPage(url, routeName)

/**
 * Initializes any required data for the Checkout Confirmation page
 * @param {string} url The url of the current page
 * @param {string} routeName The route name of the current page
 */
export const initCheckoutConfirmationPage = (url, routeName) => connector.initCheckoutConfirmationPage(url, routeName)

/**
 * Submits the shipping stage of the checkout flow.
 * @param {object} formValues All of the values from the shipping form (see store/checkout/constants:SHIPPING_FORM_NAME)
 */
export const submitShipping = (formValues) => connector.submitShipping(formValues)

/**
 * Submits the payment stage of the checkout flow.
 * @param {object} formValues All of the values from the payment form (see store/checkout/constants:PAYMENT_FORM_NAME)
 */
export const submitPayment = (formValues) => connector.submitPayment(formValues)

/**
 * Fetches shipping methods estimates for the given checkout stage
 * @param {string} formName The stage's form name to estimate shipping on
 */
export const fetchShippingMethodsEstimate = (formName) => connector.fetchShippingMethodsEstimate(formName)

/**
 * Updates the registered customer's billing and shipping addresses using
 * the address that was given during checkout. This should be called during
 * checkout once shipping information has been provided.
 */
export const updatingShippingAndBilling = () => connector.updatingShippingAndBilling()

/**
 * Checks to see if a given email is available for registration.
 * Connectors my choose to not implement this in which case they can simply
 * return `new Promise(true)` (which means the email is available and not in use)
 *
 * Note: the result is returned directly rather than being updated in the state
 *
 * @param {string} email The email to check
 * @return {boolean} `true` if the email is available, `false` if the email is associated with an existing account
 * @example
 * dispatch(isEmailAvailable('somebody@example.com'))
 *     .then((isAvailable) => ...)
 */
export const isEmailAvailable = (email) => connector.isEmailAvailable(email)
