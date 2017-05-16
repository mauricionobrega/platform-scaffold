/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

let connector = {}

export const register = (commands) => {
    connector = commands
}

export const getCart = (...args) => connector.getCart(...args)

export const fetchCartPageData = (...args) => connector.fetchCartPageData(...args)

export const removeFromCart = (...args) => connector.removeFromCart(...args)

export const updateItemQuantity = (...args) => connector.updateItemQuantity(...args)

export const addToWishlist = (...args) => connector.addToWishlist(...args)

export const addToCart = (...args) => connector.addToCart(...args)

export const fetchTaxEstimate = (...args) => connector.fetchTaxEstimate(...args)

export const putPromoCode = (...args) => connector.putPromoCode(...args)

export const deletePromoCode = (...args) => connector.deletePromoCode(...args)
