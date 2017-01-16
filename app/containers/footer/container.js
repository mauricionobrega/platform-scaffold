import React from 'react'

import FooterNewsletterSubscription from './partials/footer-newsletter-subscription'
import FooterSocialIcons from './partials/footer-social-icons'
import FooterNavigation from './partials/footer-navigation'

const social = [
    ['http://www.facebook.com/#TODO', 'static/svg/facebook.svg', 'Facebook'],
    ['http://www.twitter.com/#TODO', 'static/svg/twitter.svg', 'Twitter'],
    ['http://plus.google.com/#TODO', 'static/svg/googleplus.svg', 'Google+'],
    ['http://www.youtube.com/#TODO', 'static/svg/youtube.svg', 'Youtube'],
]

const Footer = () => {
    return (
        <footer className="t-footer">
            <FooterNewsletterSubscription />
            <FooterSocialIcons social={social} />
            <FooterNavigation />
        </footer>
    )
}

export default Footer
