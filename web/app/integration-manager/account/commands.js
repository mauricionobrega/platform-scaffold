/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

let connector = {}

export const register = (commands) => {
    connector = commands
}

/**
 * Initializes any required data for the Login page
 * @param {string} url The url of the current page
 * @param {string} routeName The route name of the current page
 */
export const initLoginPage = (url, routeName) => connector.initLoginPage(url, routeName)

/**
 * Initializes any required data for the Register page
 * @param {string} url The url of the current page
 * @param {string} routeName The route name of the current page
 */
export const initRegisterPage = (url, routeName) => connector.initRegisterPage(url, routeName)

/**
 * Called when the user switches between the Sign In and Register sections.
 * @param {object} router The React router object
 * @param {string} routes The routes configured in this application
 * @param {string} sectionName The section that was selected (typically this maps to a route name, but that is not guaranteed)
 */
export const navigateToSection = (router, routes, sectionName) => connector.navigateToSection(router, routes, sectionName)

/**
 * Logs the user in with the given credentials
 * @param {string} username The user's username
 * @param {string} password The password provided by the user in clear text
 * @param {boolean} rememberMe `true` if the login should be persistent (this may be ignored by the connector)
 *
 * @return {string} The URL to redirect to. This is often controlled by the
 *                  backend/connector. If the connector returns a valid URL
 *                  from this command, the app will navigate to the URL.
 */
export const login = (username, password, rememberMe) => connector.login(username, password, rememberMe)

/**
 * Logs the current user out
 */
export const logout = () => connector.logout()

/**
 * Creates an account using the given parameters
 * @param {string} firstname The user's first name
 * @param {string} lastname The user's lastname
 * @param {string} email The user's email
 * @param {string} password The user's password
 *
 */
export const registerUser = (firstname, lastname, email, password) => connector.registerUser(firstname, lastname, email, password)

/**
* Updates the user's shipping address to the given address
* Some backends don't distinguish between a save shipping and saved billing address
* In those cases this command will still save the address for the user
* @param {object} formValues The form values provided from the address form
*/
export const updateShippingAddress = (formValues) => connector.updateShippingAddress(formValues)

/**
* Updates the user's billing address to the given address
* Some backends don't distinguish between a save shipping and saved billing address
* In those cases this command will still save the address for the user
* @param {object} formValues The form values provided from the address form
*/
export const updateBillingAddress = (formValues) => connector.updateBillingAddress(formValues)
