import React, {PropTypes} from 'react'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

import Carousel from 'progressive-web-sdk/dist/components/carousel'
import CarouselItem from 'progressive-web-sdk/dist/components/carousel/carousel-item'
import Image from 'progressive-web-sdk/dist/components/image'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

// The ratio of the banner image width:height is 1:.84. Since the banner will be
// width=100%, we can use 84vw to predict the banner height.
const imageHeight = '84vw'
const placeholder = <SkeletonBlock height={imageHeight} />

const HomeCarousel = ({banners}) => {
    return (
        <div className="t-home__carousel">
            {banners.length > 0 ?
                <Carousel allowLooping={true} className="pw--hide-controls">
                    {banners.map(({src, href, alt}, key) => { // TODO: fix this when we put mobile assets on desktop
                        return (
                            <CarouselItem href={href} key={key}>
                                <Image
                                    src={getAssetUrl(`static/img/homepage_carousel/${key}.png`)}
                                    alt={alt}
                                    hidePlaceholder={true}
                                    loadingIndicator={placeholder}
                                />
                            </CarouselItem>
                        )
                    })}
                </Carousel>
            :
                <div style={{paddingBottom: '30px'}}>
                    {placeholder}
                </div>
            }
        </div>
    )
}

HomeCarousel.propTypes = {
    banners: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.array
    ]).isRequired,
}

export default HomeCarousel
