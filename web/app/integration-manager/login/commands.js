/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

let connector = {}

export const register = (commands) => {
    connector = commands
}

export const fetchSigninData = (...args) => connector.fetchSigninData(...args)
export const fetchRegisterData = (...args) => connector.fetchRegisterData(...args)
export const navigateToSection = (...args) => connector.navigateToSection(...args)
export const login = (...args) => connector.login(...args)
export const registerUser = (...args) => connector.registerUser(...args)
export const logout = (...args) => connector.logout(...args)
