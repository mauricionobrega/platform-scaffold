const homeParser = ($, $html) => {
    const $categories = $html.find('.navigation .level0')
    const categories = $.makeArray($categories).map((category) => {
        const $category = $(category)
        return {
            href: $category.find('a').attr('href'),
            text: $category.text()
        }
    })

    // TODO: fix this when we put mobile assets on desktop
    const $banners = $html.find('strong.logo, .home-t-shirts, .home-erin')
    const banners = $.makeArray($banners).map((banner) => {
        const $banner = $(banner)
        const $img = $banner.find('img')
        return {
            src: $img.attr('x-src') || '',
            href: $banner.attr('href'),
            alt: $img.attr('alt') || ''
        }
    })
    return {categories, banners}
}

export default homeParser
