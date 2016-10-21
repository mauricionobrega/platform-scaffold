import React, {PropTypes} from 'react'

import Carousel from 'progressive-web-sdk/dist/components/carousel'
import CarouselItem from 'progressive-web-sdk/dist/components/carousel/carousel-item'

const PDPCarousel = ({items}) => (
    <div className="c-pdp-carousel">
        <Carousel>
            {items.map((item) => {
                return (
                    <CarouselItem key={item.position}>
                        <img src={item.img} />
                    </CarouselItem>
                )
            })}
        </Carousel>
    </div>
)

PDPCarousel.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object)
}

export default PDPCarousel
