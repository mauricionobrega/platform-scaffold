/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

export const textFromFragment = (fragment) => {
    const e = document.createElement('div')
    e.innerHTML = fragment
    return e.textContent.trim()
}

export const quoteItemReviver = (k, v) => {
    if (k === 'product_price') {
        return textFromFragment(v)
    }
    return v
}

const PRODUCT_ID_REGEX = /\/product_id\/(\d+)/
const productIdFromUrl = (url) => {
    if (!url) {
        return undefined
    }
    return PRODUCT_ID_REGEX.exec(url)[1] || undefined
}

export const parse = ({cart}) => {
    return {
        ...cart,
        subtotal: textFromFragment(cart.subtotal),
        subtotal_excl_tax: textFromFragment(cart.subtotal_excl_tax),
        subtotal_incl_tax: textFromFragment(cart.subtotal_incl_tax),
        items: cart.items.map((item) => {
            for (const k of Object.keys(item)) {
                item[k] = quoteItemReviver(k, item[k])
            }
            item.productId = productIdFromUrl(item.configure_url)
            return item
        })
    }
}

export default parse
