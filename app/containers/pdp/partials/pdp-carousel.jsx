import React, {PropTypes} from 'react'

import Carousel from 'progressive-web-sdk/dist/components/carousel'
import CarouselItem from 'progressive-web-sdk/dist/components/carousel/carousel-item'
import Ratio from 'progressive-web-sdk/dist/components/ratio'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import Image from 'progressive-web-sdk/dist/components/image'

const PDPCarousel = ({items, contentsLoaded}) => {
    const carouselProps = {
        previousIcon: 'back',
        nextIcon: 'chevron-right',
        iconSize: 'medium',
        className: 'pw--frame pw--side-controls t-pdp__carousel u-padding-md u-bg-color-neutral-20'
    }

    // So long as we have items, display the carousel as intended!
    if (items.length) {
        return (
            <Carousel {...carouselProps}>
                {items.map(({img}, idx) => {
                    const imgProps = {
                        className: contentsLoaded ? 'u-block' : 'u-block c--is-transitioning', // Carousel hasn't received the final images yet
                        alt: '', // no alt text available :(
                        src: img,
                        hidePlaceholder: true,
                        ratio: {aspect: '1:1'},
                        loadingIndicator: <SkeletonBlock height="100%" />,
                        useLoaderDuringTransitions: false
                    }

                    return (
                        <CarouselItem key={idx}>
                            {/* eslint-disable jsx-a11y/img-has-alt */}
                            <Image {...imgProps} />
                            {/* eslint-enable jsx-a11y/img-has-alt */}
                        </CarouselItem>
                    )
                })}
            </Carousel>
        )
    }

    // If there are NO ITEMS then display a placeholder skeleton instead
    return (
        <CarouselItem>
            <Ratio aspect="1:1">
                <SkeletonBlock
                    height="100%"
                    width="100%"
                    className="u-padding-md"
                />
            </Ratio>
            <SkeletonBlock height="30px" />
        </CarouselItem>
    )
}

PDPCarousel.defaultProps = {
    items: []
}

PDPCarousel.propTypes = {
    contentsLoaded: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.shape({
        position: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
    }))
}

export default PDPCarousel
