export const textFromFragment = (fragment) => {
    const e = document.createElement('div')
    e.innerHTML = fragment
    return e.textContent.trim()
}

export const parseCart = ({items, subtotal, subtotal_excl_tax}) => {
    return {
        contents: items.map(({item_id, product_id, product_url, qty}) => ({
            id: item_id,
            productId: product_id,
            href: product_url,
            quantity: qty
        })),
        subtotalWithTax: textFromFragment(subtotal),
        subtotalWithoutTax: textFromFragment(subtotal_excl_tax),
        taxes: []
    }
}

export default parseCart
