const homeParser = ($, $html) => {
    const $categories = $html.find('.navigation .level0') // TODO: is New Arrivals included?
    const categories = $.makeArray($categories).map((category) => {
        const $category = $(category)
        return {
            href: $category.find('a').attr('href'),
            imgSrc: '', //TODO: mobile assets
            text: $category.text()
        }
    })
    const $banners = $html.find('.block-promo') //TODO: are we really taking these shitty images??
    const banners = $.makeArray($banners).map((banner) => {
        const $banner = $(banner)
        const $img = $banner.find('img')
        return {
            src: $img.attr('x-src') || '', //TODO: some banners use background-image
            href: $banner.attr('href'),
            alt: $img.attr('alt') || ''
        }
    })
    return {
        categories: categories,
        banners: banners
    }
}

export default homeParser
