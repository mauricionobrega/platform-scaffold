import React from 'react'

import FooterNewsletterSubscription from './partials/footer-newsletter-subscription'
import FooterSocialIcons from './partials/footer-social-icons'
import FooterNavigation from './partials/footer-navigation'

const Footer = () => {
    return (
        <footer className="t-footer">
            <FooterNewsletterSubscription />
            <FooterSocialIcons />
            <FooterNavigation />
        </footer>
    )
}

export default Footer
