import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'

export const textFromFragment = (fragment) => {
    const e = document.createElement('div')
    e.innerHTML = fragment
    return e.textContent.trim()
}

export const parseCartProducts = ({items}) => {
    const products = items.map(({product_id, product_name, product_url, product_price, product_image}) => ({
        id: product_id,
        title: product_name,
        href: product_url,
        price: textFromFragment(product_price),
        thumbnail: {
            src: product_image.src,
            alt: product_image.alt,
            width: `${product_image.width}px`,
            height: `${product_image.height}px`
        }
    }))

    const productMap = {}
    products.forEach((product) => {
        productMap[urlToPathKey(product.href)] = product
    })

    return productMap
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
