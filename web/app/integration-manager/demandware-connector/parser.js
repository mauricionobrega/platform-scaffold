const parseCarouselItems = (imageGroups) => {
    const largeImages = imageGroups.filter((imageGroup) => imageGroup.view_type === 'large')[0]
    return largeImages.images.map(({alt, link}, idx) => ({alt, img: link, position: idx.toString()}))

}

export const parseProductDetails = (productJSON) => {
    return {
        title: productJSON.name,
        price: '$0.00', // Hard coded until we get prices on the demandware sandbox
        description: productJSON.long_description,
        carouselItems: parseCarouselItems(productJSON.image_groups)
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
        summary_count: items.length
    }
}
