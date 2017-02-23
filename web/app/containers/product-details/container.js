import React from 'react'

import * as commands from '../../integration-manager/commands'

import ProductDetailsHeading from './partials/product-details-heading'
import ProductDetailsCarousel from './partials/product-details-carousel'
import ProductDetailsDescription from './partials/product-details-description'
import ProductDetailsAddToCart from './partials/product-details-add-to-cart'
import ProductDetailsItemAddedModal from './partials/product-details-item-added-modal'

const ProductDetails = ({route: {routeName}}) => {
    return (
        <div className="t-product-details">
            <ProductDetailsHeading isInCheckout={routeName === 'cartEditPage'} />
            <ProductDetailsCarousel />
            <ProductDetailsDescription />
            <ProductDetailsAddToCart />
            <ProductDetailsItemAddedModal />
        </div>
    )
}

ProductDetails.fetcher = (url, dispatch) => {
    dispatch(commands.fetchPdpData(url))
}

ProductDetails.propTypes = {
    /**
    * The route object passed down by the router
    */
    route: React.PropTypes.object,
}

export default ProductDetails
