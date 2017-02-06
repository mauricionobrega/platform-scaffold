import {parseImage} from '../../../utils/parser-utils'

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
        const $img = $(banner).find('img')
        return parseImage($img)
    })
    return {categories, banners}
}

export default homeParser
