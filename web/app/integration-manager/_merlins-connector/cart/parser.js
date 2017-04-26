import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {getCheckoutConfigObject} from '../../../utils/magento-utils'
import {formatMerlinsMoney, textFromFragment, parsePriceToCents} from '../utils'

const calculateSubtotal = (priceFragment, quantity) => {
    const price = textFromFragment(priceFragment)
    const subtotal = (parsePriceToCents(price) * quantity) / 100
    return formatMerlinsMoney(subtotal)
}

export const parseCartProducts = ({items}) => /* Products */ {
    const products = items.map(({product_id, product_name, product_url, product_price, product_image}) => ({
        id: product_id,
        title: product_name,
        href: product_url,
        price: textFromFragment(product_price),
        thumbnail: {
            src: product_image.src,
            alt: product_image.alt,
            size: {
                width: `${product_image.width}px`,
                height: `${product_image.height}px`
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
            linePrice: calculateSubtotal(product_price, qty)
        })),
        subtotal: textFromFragment(subtotal_excl_tax),
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
