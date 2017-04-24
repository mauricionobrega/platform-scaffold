import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {getCheckoutConfigObject} from '../../../utils/magento-utils'
import {formatMerlinsMoney} from '../utils'

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
        subtotal: textFromFragment(subtotal_excl_tax),
        taxes: [],
        orderTotal: textFromFragment(subtotal)
    }
}

export const parseCartHtml = ($, $html) => {
    const js = getCheckoutConfigObject($html)

    return {
        contents: js.quoteItemData.map((item) => {
            return {
                id: item.item_id,
                productId: item.product_id,
                href: `/${item.product.request_path}`,
                quantity: item.qty
            }
        }),
        subtotal: formatMerlinsMoney(js.quoteData.subtotal),
        taxes: [{
            label: 'Tax',
            amount: formatMerlinsMoney(js.totalsData.tax_amount)
        }],
        orderTotal: formatMerlinsMoney(js.quoteData.grand_total)
    }
}
