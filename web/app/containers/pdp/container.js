import React from 'react'

import PDPHeading from './partials/pdp-heading'
import PDPCarousel from './partials/pdp-carousel'
import PDPDescription from './partials/pdp-description'
import PDPAddToCart from './partials/pdp-add-to-cart'
import PDPItemAddedModal from './partials/pdp-item-added-modal'

const PDP = () => {
    let coverage = '50'
    if (window.innerHeight < 370) {
        coverage = '70'
    } else if (window.innerHeight < 460) {
        coverage = '56'
    }

    return (
        <div className="t-pdp">
            <PDPHeading />
            <PDPCarousel />
            <PDPDescription />
            <PDPAddToCart />
            <PDPItemAddedModal coverage={coverage}/>
        </div>
    )
}

export default PDP
