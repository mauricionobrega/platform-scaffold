
import {SITE_ID} from './constants'

const formatPrice = (price) => `$${price.toFixed(2)}`

const parseImages = (imageGroups) => {
    const largeImages = imageGroups.filter((imageGroup) => imageGroup.view_type === 'large')[0]

    return largeImages.images.map(({alt, link}) => ({
        alt,
        src: link
    }))
}

export const parseProductDetails = ({id, name, price, long_description, image_groups, variants, variation_attributes}) => {
    const images = parseImages(image_groups)
    return {
        id,
        title: name,
        price: `${formatPrice(price)}`,
        description: long_description,
        thumbnail: images[0],
        images,
        variationOptions: variation_attributes,
        availableVariations: variants.map(({product_id, variation_values}) => {
            return {
                variationID: product_id,
                variationValues: variation_values
            }
        })
    }
}

export const getCurrentProductID = () => {
    const productIDMatch = /(\d+).html/.exec(window.location.href)
    return productIDMatch ? productIDMatch[1] : ''
}

export const parseBasketContents = ({product_items, product_sub_total}) => {
    /* eslint-disable camelcase */
    const items = product_items ? product_items.map(({product_name, base_price, quantity}) => {
        return {
            product_name,
            product_price: `${formatPrice(base_price)}`,
            product_image: {},
            qty: quantity
        }
    }) : []
    return {
        items,
        subtotal: formatPrice(product_sub_total ? product_sub_total : 0),
        summary_count: items && items.length
    }
    /* eslint-enable camelcase  */
}

export const parseCategories = (categories) => {
    return categories.map((category) => {
        return {
            title: category.name,
            path: `/s/${SITE_ID}/${category.id}`,
            isCategoryLink: true,
            children: category.categories ? parseCategories(category.categories) : []
        }
    })
}

export const getProductHref = (productID) => `/s/2017refresh/${productID}.html`

export const parseProductHit = ({product_id, product_name, price, prices, image}) => {
    // Some products don't have _any_ pricing on them!
    const finalPrice = price || (prices && prices['usd-sale-prices']) || undefined
    const thumbnail = {
        alt: image.alt,
        src: image.link
    }

    return {
        id: product_id,
        title: product_name,
        price: finalPrice ? formatPrice(finalPrice) : '$ N/A',
        href: getProductHref(product_id),
        thumbnail,
        images: [thumbnail]
    }
}

export const parseProductListData = (products) => {
    const productListData = {}
    products.forEach((productHit) => {
        productListData[getProductHref(productHit.product_id)] = parseProductHit(productHit)
    })
    return productListData
}
