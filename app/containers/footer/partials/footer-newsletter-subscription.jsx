import React, {PropTypes} from 'react'

import NewsletterForm from './newsletter-form'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'

const FooterNewsletterSubscription = ({newsletter, onSubmit}) => {
    const skeleton = <SkeletonText lines={8} width="100%" style={{lineHeight: '2em'}} />

    return (
        <div className="t-footer__newsletter u-padding-md u-padding-top-lg u-padding-bottom-lg">
            <div>
                <h2 className="u-h2 u-margin-bottom-md">
                    Subscribe to Merlin&#39;s Newsletter
                </h2>

                <NewsletterForm disabled={!newsletter} onSubmit={onSubmit} />
            </div>
        </div>
    )
}

FooterNewsletterSubscription.propTypes = {
    newsletter: PropTypes.object,
    onSubmit: PropTypes.func
}

export default FooterNewsletterSubscription
