import React from 'react'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

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
                    <a href={url} className="t-footer__social-link" key={url} style={{backgroundImage: `url(${getAssetUrl(icon)})`}}>
                        <span className="u-visually-hidden">{title}</span>
                    </a>
                )}
            </div>
        </div>
    )
}

export default FooterSocialIcons
