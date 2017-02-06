import React from 'react'

import FooterNewsletterSubscription from './partials/footer-newsletter-subscription'
import FooterSocialIcons from './partials/footer-social-icons'
import FooterNavigation from './partials/footer-navigation'

const Footer = () => {
    render() {
        return (
            if (this.props.isRunningInAstro) {
                return null
            }

            <footer className="t-footer">
                <FooterNewsletterSubscription />
                <FooterSocialIcons />
                <FooterNavigation />
            </footer>
        )
    }
}

Footer.propTypes = {
    /**
     * Defines whether we're being hosted in an Astro app
     */
    isRunningInAstro: PropTypes.bool,
}

export default Footer
