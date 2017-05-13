/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {textFromFragment, productSubtotal, getHighResImage, formatMerlinsMoney} from '../utils'

export const parseCartProducts = ({items}) => /* Products */ {
    const products = items.map(({product_id, product_name, product_url, product_price, product_image}) => ({
        id: product_id,
        title: product_name,
        href: product_url,
        price: textFromFragment(product_price),
        thumbnail: {
            src: getHighResImage(product_image.src),
            alt: product_image.alt,
            size: { /* See getHighResImage which has size hard-coded */
                width: '240px',
                height: '300px'
            }
        }
    }))

    const productMap = {}
    products.forEach((product) => {
        productMap[urlToPathKey(product.href)] = product
    })

    return productMap
}

export const parseCart = ({items, subtotal, subtotal_excl_tax}) => /* Cart */ {
    return {
        items: items.map(({item_id, product_id, product_url, qty, product_price}) => ({
            id: item_id,
            productId: product_id,
            href: product_url,
            quantity: qty,
            itemPrice: textFromFragment(product_price),
            linePrice: productSubtotal(textFromFragment(product_price), qty)
        })),
        subtotal: textFromFragment(subtotal_excl_tax),
        orderTotal: textFromFragment(subtotal)
    }
}

// @TODO: Note that this used to be parseTotals
export const parseCartTotals = ({
    coupon_code,
    subtotal_with_discount,
    tax_amount,
    discount_amount,
    shipping_amount,
    base_grand_total
}) => {
    return {
        shipping: {
            // label // => this value is either blank or set when a shipping method is chosen
            amount: formatMerlinsMoney(shipping_amount)
        },
        discount: {
            label: coupon_code,
            code: coupon_code,
            amount: formatMerlinsMoney(discount_amount, true)
        },
        subtotal: formatMerlinsMoney(subtotal_with_discount),
        tax: formatMerlinsMoney(tax_amount),
        orderTotal: formatMerlinsMoney(base_grand_total)
    }
}
