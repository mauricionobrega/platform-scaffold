import React, {PropTypes} from 'react'

import Carousel from 'progressive-web-sdk/dist/components/carousel'
import CarouselItem from 'progressive-web-sdk/dist/components/carousel/carousel-item'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import Image from 'progressive-web-sdk/dist/components/image'

const PDPCarousel = ({items}) => {
    return (items.length > 0 ?
        <Carousel previousIcon="back" nextIcon="chevron-right" iconSize="medium" className="c-pdp-carousel c--frame c--side-controls">
            {items.map((item, idx) => {
                const alt = '' // no alt text available :(
                return (
                    <CarouselItem key={idx}>
                        <Image
                            alt={alt}
                            src={item.img}
                            hidePlaceholder={true}
                            loadingIndicator={<SkeletonBlock height="100vw" />} />
                    </CarouselItem>
                )
            })}
        </Carousel>
    :
        <SkeletonBlock height="100vw" width="100%" />
    )
}

PDPCarousel.defaultProps = {
    items: []
}

PDPCarousel.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        position: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired
    }))
}

export default PDPCarousel
