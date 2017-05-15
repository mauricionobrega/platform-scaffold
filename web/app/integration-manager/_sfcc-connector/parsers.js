/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {SITE_ID} from './constants'
import {formatPrice} from './utils'

const parseImages = (imageGroups) => {
    const largeImages = imageGroups.filter((imageGroup) => imageGroup.view_type === 'large')[0]

    return largeImages.images.map(({alt, link}) => ({
        alt,
        src: link
    }))
}

/* eslint-disable camelcase */
const parseVariationCategories = (variation_attributes) => {
    return variation_attributes.map(({id, name, values}) => ({
        id,
        label: name,
        values: values.map(({name, value}) => ({
            label: name,
            value
        }))
    }))
}

const setInitialVariantValues = (variants, id, variationCategories) => {
    const currentVariant = variants.find(({product_id}) => product_id === id)

    if (currentVariant) {
        return currentVariant.variation_values
    }

    const defaultVariant = {}
    variationCategories.forEach(({id, values}) => {
        defaultVariant[id] = values[0].value
    })

    return defaultVariant
}

/* eslint-enable camelcase */

export const getProductHref = (productID) => `/s/2017refresh/${productID}.html`

export const parseProductDetails = ({id, name, price, long_description, image_groups, variants, variation_attributes}) => {
    const images = parseImages(image_groups)
    return {
        id,
        title: name,
        price: `${formatPrice(price)}`,
        description: long_description,
        thumbnail: images[0],
        images,
        initialValues: setInitialVariantValues(variants, id, variation_attributes),
        variationCategories: parseVariationCategories(variation_attributes),
        variants: variants.map(({product_id, variation_values}) => {
            return {
                id: product_id,
                values: variation_values
            }
        })
    }
}

export const getCurrentProductID = (url) => {
    let productID

    let productIDMatch = /(\d+).html/.exec(url)
    if (productIDMatch) {
        productID = productIDMatch[1]
    }

    if (!productID) {
        // Cart edit style: https://.../checkout/cart/configure/id/{basket_id}/product_id/{product_id}/
        productIDMatch = /product_id\/(\d+)/.exec(url)
        productID = productIDMatch ? productIDMatch[1] : ''
    }

    console.log('[getCurrentProductID]', productID)
    return productID
}

export const getInitialSelectedVariant = (variants, initialValues) => {
    return variants.find(({values}) => {
        return Object.keys(values).every((key) => {
            return values[key] === initialValues[key]
        })
    })
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
