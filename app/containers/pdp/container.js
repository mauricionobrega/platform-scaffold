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

const PDP = ({
    setQuantity,
    addToCart,
    closeItemAddedModal,
    itemQuantity,
    quantityAdded,
    itemAddedModalOpen,
    formInfo,
    contentsLoaded,
    title,
    price,
    carouselItems
}) => {
    return (
        <div className="t-pdp">
            <PDPHeading />

            <PDPCarousel items={carouselItems} contentsLoaded={contentsLoaded} />

            <PDPDescription />

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
                    product={{title, price, carouselItems}}
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
     * Function to update the item quantity when user changes it
     */
    setQuantity: PropTypes.func.isRequired,
    carouselItems: PropTypes.array,
    contentsLoaded: PropTypes.bool,
    description: PropTypes.string,
    formInfo: PropTypes.object,
    itemAddedModalOpen: PropTypes.bool,
    itemQuantity: PropTypes.number,
    price: PropTypes.string,
    quantityAdded: PropTypes.number,
    title: PropTypes.string
}

export const mapStateToProps = createStructuredSelector({
    title: selectors.getProductTitle,
    price: selectors.getProductPrice,
    description: selectors.getProductDescription,
    carouselItems: selectorToJS(selectors.getProductCarouselItems),
    itemQuantity: selectors.getItemQuantity,
    quantityAdded: selectors.getQuantityAdded,
    itemAddedModalOpen: selectors.getItemAddedModalOpen,
    formInfo: selectorToJS(selectors.getFormInfo),
    contentsLoaded: selectors.getPdpContentsLoaded
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
