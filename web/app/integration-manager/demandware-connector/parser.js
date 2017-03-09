const parseCarouselItems = (imageGroups) => {
    const largeImages = imageGroups.filter((imageGroup) => imageGroup.view_type === 'large')[0]
    return largeImages.images.map(({alt, link}, idx) => ({alt, img: link, position: idx.toString()}))

}

export const parseProductDetails = ({name, price, long_description, image_groups}) => {
    return {
        title: name,
        price: `$${price.toFixed(2)}`, // Hard coded until we get prices on the demandware sandbox
        description: long_description,
        carouselItems: parseCarouselItems(image_groups)
    }
}


export const parseBasketContents = ({product_items, product_sub_total}) => {
    const items = product_items.map(({product_name, base_price, quantity}) => {
        return {
            product_name,
            product_price: `$${base_price.toFixed(2).toString()}`,
            product_image: {},
            qty: quantity
        }
    })
    return {
        items,
        subtotal: `$${product_sub_total.toFixed(2).toString()}`,
        summary_count: items && items.length
    }
}

// TODO: find a better way to get this URL
export const getProductHref = (productID) => `/s/2017refresh/${productID}.html`

export const parseProductHit = ({product_id, product_name, price, image}) => {
    return {
        title: product_name,
        price: `$${price.toFixed(2).toString()}`,
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
            position: 1
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
