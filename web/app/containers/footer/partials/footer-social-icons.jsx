import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectorToJS} from '../../../utils/selector-utils'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

import Image from 'progressive-web-sdk/dist/components/image'
import LazyLoader from 'progressive-web-sdk/dist/components/lazy-loader'

import {showLazyLoadedImage} from '../../app/actions'
import * as selectors from '../../app/selectors'

const social = [
    ['http://www.facebook.com/#TODO', 'static/svg/facebook.svg', 'Facebook'],
    ['http://www.twitter.com/#TODO', 'static/svg/twitter.svg', 'Twitter'],
    ['http://plus.google.com/#TODO', 'static/svg/googleplus.svg', 'Google+'],
    ['http://www.youtube.com/#TODO', 'static/svg/youtube.svg', 'Youtube'],
]

class FooterSocialIcons extends React.Component {
    constructor(props) {
        super(props)

        this.lazyLoadImages = this.lazyLoadImages.bind(this)
    }

    lazyLoadImages(icon, title, src, identifier) {
        const showImage = () => {
            return new Promise((resolve) => {
                this.props.showLazyLoadedImage(identifier, src)
                resolve()
            })
        }

        const renderImage = this.props.lazyLoadImages[identifier] && this.props.lazyLoadImages[identifier][src]

        return (
            <LazyLoader fetchItems={showImage} itemTotal={1} itemsPerPage={1} currentItemCount={renderImage ? 1 : 0}>
                {renderImage ? <Image src={src} width="32" height="32" alt={title} /> : ''}
            </LazyLoader>
        )
    }

    render() {
        return (
            <div className="t-footer__social u-padding-md">
                <div className="u-flexbox u-justify-center u-padding-md">
                    {social.map(([url, icon, title]) => {
                        const src = getAssetUrl(icon)
                        return (
                            <a href={url} className="t-footer__social-link" key={url}>
                                {this.lazyLoadImages(icon, title, src, 'footerIcons')}
                            </a>
                        )
                    }
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    lazyLoadImages: selectorToJS(selectors.getLazyLoadImages)
})

const mapDispatchToProps = {
    showLazyLoadedImage: (identifier, src) => showLazyLoadedImage(identifier, src)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FooterSocialIcons)
