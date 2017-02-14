import React, {PropTypes} from 'react'

import FooterNewsletterSubscription from './partials/footer-newsletter-subscription'
import FooterSocialIcons from './partials/footer-social-icons'
import FooterNavigation from './partials/footer-navigation'

const Footer = (props) => {
    if (props.isRunningInAstro) {
        return null
    }

    return (
        <footer className="t-footer">
            <FooterNewsletterSubscription />
            <FooterSocialIcons />
            <FooterNavigation />
        </footer>
    )
}

Footer.propTypes = {
    /**
     * Defines whether we're being hosted in an Astro app
     */
    isRunningInAstro: PropTypes.bool,
}

export default Footer
