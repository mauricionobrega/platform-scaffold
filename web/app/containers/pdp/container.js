import React from 'react'

import PDPHeading from './partials/pdp-heading'
import PDPCarousel from './partials/pdp-carousel'
import PDPDescription from './partials/pdp-description'
import PDPAddToCart from './partials/pdp-add-to-cart'
import PDPItemAddedModal from './partials/pdp-item-added-modal'

const PDP = () => {
    return (
        <div className="t-pdp">
            <PDPHeading />
            <PDPCarousel />
            <PDPDescription />
            <PDPAddToCart />
            <PDPItemAddedModal />
        </div>
    )
}

export default PDP
