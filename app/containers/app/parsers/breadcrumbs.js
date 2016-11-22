const breadcrumbsParser = ($, $html) => {
    const items = $html.find('.breadcrumbs .item').map((_, item) => {
        const $item = $(item)
        return {
            href: $item.find('a').attr('href'),
            text: $item.text().trim()
        }
    })
    return {
        items: items.toArray()
    }
}

export default breadcrumbsParser
