
export const parseNavigation = ($, $content) => {
    const root = {title: 'Root', path: '/', children: []}
    const $signIn = $content.find('.header.links li.authorization-link a').first()
    root.children.push({
        title: $signIn.text().trim(),
        path: $signIn.attr('href'),
        type: 'AccountNavItem',
    })

    const $navListItems = $content.find('#store\\.menu nav.navigation li')
    let path = root.path
    $navListItems.each((idx, item) => {
        const $item = $(item)
        const $link = ($item
            .find('a')
            .first()
        )
        root.children.push({
            title: $link.text().trim(),
            path: $link.attr('href'),
            isCategoryLink: true
        })
        if ($item.hasClass('active')) {
            path = $link.attr('href')
        }
    })
    return {root, path}
}
