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
    closeItemAddedModal,
    quantityAdded,
    itemAddedModalOpen,
    contentsLoaded,
    title,
    price,
    carouselItems
}) => {
    return (
        <div className="t-pdp">
            <PDPHeading />
            <PDPCarousel />
            <PDPDescription />
            <PDPAddToCart />

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
     * Callback when the added-to-cart modal closes
     */
    closeItemAddedModal: PropTypes.func.isRequired,
    carouselItems: PropTypes.array,
    contentsLoaded: PropTypes.bool,
    itemAddedModalOpen: PropTypes.bool,
    price: PropTypes.string,
    quantityAdded: PropTypes.number,
    title: PropTypes.string
}

export const mapStateToProps = createStructuredSelector({
    title: selectors.getProductTitle,
    price: selectors.getProductPrice,
    carouselItems: selectorToJS(selectors.getProductCarouselItems),
    quantityAdded: selectors.getQuantityAdded,
    itemAddedModalOpen: selectors.getItemAddedModalOpen,
    contentsLoaded: selectors.getPdpContentsLoaded
})

const mapDispatchToProps = {
    closeItemAddedModal: stripEvent(pdpActions.closeItemAddedModal)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PDP)
