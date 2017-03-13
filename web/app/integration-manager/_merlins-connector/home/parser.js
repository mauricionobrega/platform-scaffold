import {parseImage} from '../../../utils/parser-utils'

const BANNER_SELECTOR = 'strong.logo, .home-t-shirts, .home-erin'
const CATEGORY_SELECTOR = '.navigation li.level0'

const parseCategory = ($category) => {
    const $a = $category.find('a')
    return {
        href: $a.attr('href'),
        text: $a.find('span').text()
    }
}

const homeParser = ($, $html) => {
    // TODO: fix this when we put mobile assets on desktop
    const banners = [].map.call(
        $html.find(BANNER_SELECTOR),
        (banner) => parseImage($(banner).find('img'))
    )

    const categories = [].map.call(
        $html.find(CATEGORY_SELECTOR),
        (category) => parseCategory($(category))
    )

    return {banners, categories}
}

export default homeParser
