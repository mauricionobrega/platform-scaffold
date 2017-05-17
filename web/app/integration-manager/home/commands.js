/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

let connector = {}

export const register = (commands) => {
    connector = commands
}

/**
 * Initializes any required data for the Home page
 * @param {string} url The url of the current page
 * @param {string} routeName The route name of the current page
 */
export const initHomePage = (url, routeName) => connector.initHomePage(url, routeName)
