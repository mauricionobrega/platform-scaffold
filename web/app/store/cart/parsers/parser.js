/*
* This file and the related test files are a dupe of the ones in the merlin's connector
* Remove this file once the cart section has been fully converted to the merlin's connector
*/
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

export const cartReviver = (k, v) => {
    switch (k) {
        case 'subtotal':
        case 'subtotal_excl_tax':
        case 'subtotal_incl_tax':
            return textFromFragment(v)
        case 'items':
            return v.map((item) => {
                for (const k of Object.keys(item)) {
                    item[k] = quoteItemReviver(k, item[k])
                }
                item.productId = productIdFromUrl(item.configure_url)
                return item
            })
        default:
            return v
    }
}

export const parse = (responseText) => {
    return JSON.parse(responseText, cartReviver).cart
}

export default parse
