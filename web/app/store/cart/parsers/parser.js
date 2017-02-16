
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
