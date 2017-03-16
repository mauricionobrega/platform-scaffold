
import {SITE_ID} from './constants'

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

export const getCurrentProductID = () => {
    const productIDMatch = /(\d+).html/.exec(window.location.href)
    return productIDMatch ? productIDMatch[1] : ''
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
