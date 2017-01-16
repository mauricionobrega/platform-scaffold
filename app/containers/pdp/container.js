import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectorToJS} from '../../utils/selector-utils'

import PDPHeading from './partials/pdp-heading'
import PDPCarousel from './partials/pdp-carousel'
import PDPDescription from './partials/pdp-description'
import PDPAddToCart from './partials/pdp-add-to-cart'
import PDPItemAddedModal from './partials/pdp-item-added-modal'
import {stripEvent} from '../../utils/utils'
import * as pdpActions from './actions'
import * as selectors from './selectors'

const PDP = ({setQuantity, addToCart, closeItemAddedModal, pdp, product}) => {
    const {
        itemQuantity,
        quantityAdded,
        itemAddedModalOpen,
        formInfo,
        contentsLoaded
    } = pdp

    const {
        title,
        price,
        description,
        carouselItems
    } = product


    return (
        <div className="t-pdp">
            <PDPHeading title={title} price={price} />

            <PDPCarousel items={carouselItems} contentsLoaded={contentsLoaded} />

            <PDPDescription description={description} />

            <PDPAddToCart
                formInfo={formInfo}
                quantity={itemQuantity}
                setQuantity={setQuantity}
                onSubmit={addToCart}
                disabled={!contentsLoaded}
                />

            {contentsLoaded &&
                <PDPItemAddedModal
                    open={itemAddedModalOpen}
                    onDismiss={closeItemAddedModal}
                    product={product}
                    quantity={quantityAdded}
                    />
                }
        </div>
    )
}

PDP.propTypes = {
    /**
     * Function to submit the add-to-cart form
     */
    addToCart: PropTypes.func.isRequired,
    /**
     * Callback when the added-to-cart modal closes
     */
    closeItemAddedModal: PropTypes.func.isRequired,
    /**
     * The Immutable.js PDP state object
     */
    pdp: PropTypes.object.isRequired,
    /**
     * Product data from state (Catalog -> Products)
     */
    product: PropTypes.object.isRequired,
    /**
     * Function to update the item quantity when user changes it
     */
    setQuantity: PropTypes.func.isRequired,
}

export const mapStateToProps = createStructuredSelector({
    product: selectorToJS(selectors.getSelectedProduct),
    pdp: selectorToJS(selectors.getSelectedPdp)
})

const mapDispatchToProps = {
    setQuantity: pdpActions.setItemQuantity,
    addToCart: stripEvent(pdpActions.submitCartForm),
    closeItemAddedModal: stripEvent(pdpActions.closeItemAddedModal)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PDP)
