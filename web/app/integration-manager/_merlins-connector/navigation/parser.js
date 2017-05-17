/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {SIGNED_IN_NAV_ITEM_TYPE, GUEST_NAV_ITEM_TYPE} from '../../../containers/navigation/constants'

// We hard-code this since it is only parseable from non-checkout pages.
const SIGN_IN_HREF = '/customer/account/login/'

export const parseNavigation = ($, $content, isLoggedIn) => {
    const root = {title: 'Root', path: '/', children: []}
    const $signIn = $content.find('.header.links li.authorization-link a').first()

    root.children.push({
        title: $signIn.text().trim(),
        type: isLoggedIn ? SIGNED_IN_NAV_ITEM_TYPE : GUEST_NAV_ITEM_TYPE,
        // Long story. The nav system ignores the `path` property when the user is
        // logged in. Until we rework this, we always send the login path so the
        // reducer in the `containers/navigation/` area can just flip the account
        // node type and title and not worry about switching/adding/deleting the
        // `path` attribute.
        // See also `containers/navigation/container.jsx`'s `itemFactory()` function.
        path: SIGN_IN_HREF
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
