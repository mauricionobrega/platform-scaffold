import React, {PropTypes} from 'react'

import Carousel from 'progressive-web-sdk/dist/components/carousel'
import CarouselItem from 'progressive-web-sdk/dist/components/carousel/carousel-item'

const PDPCarousel = ({items}) => (
    <Carousel>
        {items.map((item) => {
            return (
                <CarouselItem key={item.position}>
                    <img role="presentation" src={item.img} />
                </CarouselItem>
            )
        })}
    </Carousel>
)

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
