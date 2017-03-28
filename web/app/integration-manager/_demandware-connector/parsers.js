
import {SITE_ID} from './constants'

const formatPrice = (price) => `$${price.toFixed(2)}`

const parseCarouselItems = (imageGroups) => {
    const largeImages = imageGroups.filter((imageGroup) => imageGroup.view_type === 'large')[0]
    return largeImages.images.map(({alt, link}, idx) => ({alt, img: link, position: idx.toString()}))
}

export const parseProductDetails = ({name, price, long_description, image_groups, variants, variation_attributes}) => {
    return {
        title: name,
        price: `${formatPrice(price)}`,
        description: long_description,
        carouselItems: parseCarouselItems(image_groups),
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
    /* eslint-enable camelcase:  */
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
    let formattedPrice = '$ N/A'
    if (finalPrice) {
        formattedPrice = `${formatPrice(finalPrice)}`
    }

    return {
        title: product_name,
        price: formattedPrice,
        link: {
            href: getProductHref(product_id),
            text: product_name
        },
        image: {
            alt: image.alt,
            src: image.link
        },
        carouselItems: [{
            img: image.link,
            position: '1'
        }]
    }
}

export const parseProductListData = (products) => {
    const productListData = {}
    products.forEach((productHit) => {
        productListData[getProductHref(productHit.product_id)] = parseProductHit(productHit)
    })
    return productListData
}
