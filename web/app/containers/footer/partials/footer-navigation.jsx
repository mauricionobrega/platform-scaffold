import React from 'react'

import Divider from 'progressive-web-sdk/dist/components/divider'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'

const footerLinks = [
    {text: 'Privacy and Cookie Policy', href: '/privacy-policy-cookie-restriction-mode/'},
    {text: 'Search Terms', href: '/search/term/popular/'},
    {text: 'Contact Us', href: '/contact/'},
    {text: 'Orders and Returns', href: '/sales/guest/form/'},
    {text: 'Advanced Search', href: '/catalogsearch/advanced'}
]

const FooterNavigation = () => {
    return (
        <div className="t-footer__navigation u-padding-lg u-text-align-center">
            {footerLinks.map(({text, href}) => (
                <ListTile href={href} key={text}>
                    {text}
                </ListTile>
            ))}

            <Divider />

            <div className="t-footer__copyright u-padding-top u-padding-bottom">
                <p>Copyright Merlin&#39;s Potions 2017</p>
                <p className="u-margin-top">All rights reserved.</p>
            </div>
        </div>
    )
}

export default FooterNavigation
