import React, {PropTypes} from 'react'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

const FooterSocialIcons = ({social}) => {
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

FooterSocialIcons.propTypes = {
    social: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
}

export default FooterSocialIcons
