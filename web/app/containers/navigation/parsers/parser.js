/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

export const parseNavigation = ($, $content) => {
    const root = {title: 'Root', path: '/', children: []}
    const $signIn = $content.find('.header.links li.authorization-link a').first()
    const signInHref = $signIn.attr('href')

    if (/logout/i.test(signInHref)) {
        root.children.push({
            title: $signIn.text().trim(),
            type: 'AccountLogoutNavItem',
        })
    } else {
        root.children.push({
            title: $signIn.text().trim(),
            path: $signIn.attr('href'),
            type: 'AccountNavItem',
        })
    }

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
        })
        if ($item.hasClass('active')) {
            path = $link.attr('href')
        }
    })
    return {root, path}
}
