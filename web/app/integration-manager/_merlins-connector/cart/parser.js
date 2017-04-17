
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
    const {cart} = JSON.parse(responseText, cartReviver)
    return {
        ...cart,
        contents: cart.items.map(({item_id, product_id, product_url, qty}) => ({
            id: item_id,
            productId: product_id,
            href: product_url,
            quantity: qty
        })),
        subtotalWithTax: textFromFragment(cart.subtotal),
        subtotalWithoutTax: textFromFragment(cart.subtotal_excl_tax),
        taxes: []
    }
}

export default parse
