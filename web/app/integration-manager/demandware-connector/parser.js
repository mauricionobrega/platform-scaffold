const parseCarouselItems = (imageGroups) => {
    const largeImages = imageGroups.filter((imageGroup) => imageGroup.view_type === 'large')[0]
    return largeImages.images.map(({alt, link}, idx) => ({alt, img: link, position: idx}))

}

export const parseProductDetails = (productJSON) => {
    return {
        title: productJSON.name,
        price: '$0.00', // Hard coded until we get prices on the demandware sandbox
        description: productJSON.long_description,
        carouselItems: parseCarouselItems(productJSON.image_groups)
    }
}
