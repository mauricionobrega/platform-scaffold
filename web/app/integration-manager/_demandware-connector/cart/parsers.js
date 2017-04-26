import {getProductHref} from '../parsers'
import {formatPrice} from '../utils'

export const parseCartContents = ({product_items, product_sub_total, merchandize_total_tax, order_total}) => /* Cart */ {
    /* eslint-disable camelcase */
    const items = (product_items || []).map(({item_id, product_id, price_after_order_discount, quantity}) => ({
        id: item_id,
        productId: product_id,
        quantity,
        href: getProductHref(product_id),
        itemPrice: `${formatPrice(price_after_order_discount / quantity)}`,
        linePrice: `${formatPrice(price_after_order_discount)}`
    }))

    return {
        items,
        subtotal: formatPrice(product_sub_total),
        taxes: {
            label: 'Tax',
            amount: formatPrice(merchandize_total_tax)
        },
        /* TODO: shipping: undefined, */
        // order_total isn't provided by SFCC until many details have
        // been provided so we fall back to product_sub_total when its missing
        orderTotal: formatPrice(order_total || product_sub_total)
    }
    /* eslint-enable camelcase */
}
