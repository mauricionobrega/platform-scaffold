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
    const items = product_items && product_items.map(({product_name, base_price, quantity}) => {
        return {
            product_name,
            product_price: `$${base_price.toFixed(2).toString()}`,
            product_image: {},
            qty: quantity
        }
    })
    return {
        items,
        subtotal: product_sub_total && `$${product_sub_total.toFixed(2).toString()}`,
        summary_count: items && items.length
    }
}
