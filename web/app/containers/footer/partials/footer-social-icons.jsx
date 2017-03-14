import React from 'react'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import LazyLoadImage from '../../../components/lazy-load-image'
import Image from 'progressive-web-sdk/dist/components/image'

const social = [
    ['http://www.facebook.com/#TODO', 'static/svg/facebook.svg', 'Facebook'],
    ['http://www.twitter.com/#TODO', 'static/svg/twitter.svg', 'Twitter'],
    ['http://plus.google.com/#TODO', 'static/svg/googleplus.svg', 'Google+'],
    ['http://www.youtube.com/#TODO', 'static/svg/youtube.svg', 'Youtube'],
]

const FooterSocialIcons = () => {
    return (
        <div className="t-footer__social u-padding-md">
            <div className="u-flexbox u-justify-center u-padding-md">
                {social.map(([url, icon, title]) =>
                    <a href={url} className="t-footer__social-link" key={url}>
                        <LazyLoadImage
                            image={
                                <Image
                                    src={getAssetUrl(icon)}
                                    alt={title}
                                    height="32"
                                    width="32"
                                />
                            }
                            placeholder={<span className="u-visually-hidden">{title}</span>}
                            threshold={100}
                        />
                    </a>
                )}
            </div>
        </div>
    )
}

export default FooterSocialIcons
