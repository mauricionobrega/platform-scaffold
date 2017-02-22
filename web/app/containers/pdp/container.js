import React from 'react'

import * as commands from '../../integration-manager/commands'

import PDPHeading from './partials/pdp-heading'
import PDPCarousel from './partials/pdp-carousel'
import PDPDescription from './partials/pdp-description'
import PDPAddToCart from './partials/pdp-add-to-cart'
import PDPItemAddedModal from './partials/pdp-item-added-modal'

const PDP = ({route: {routeName}}) => {
    return (
        <div className="t-pdp">
            <PDPHeading isInCheckout={routeName === 'cartEditPage'} />
            <PDPCarousel />
            <PDPDescription />
            <PDPAddToCart />
            <PDPItemAddedModal />
        </div>
    )
}

PDP.fetcher = (url, dispatch) => {
    dispatch(commands.fetchPdpData(url))
}

PDP.propTypes = {
    /**
    * The route object passed down by the router
    */
    route: React.PropTypes.object,
}

export default PDP
