import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'

import PDPHeading from './partials/pdp-heading'
import PDPCarousel from './partials/pdp-carousel'
import PDPDescription from './partials/pdp-description'
import PDPAddToCart from './partials/pdp-add-to-cart'
import PDPItemAddedModal from './partials/pdp-item-added-modal'
import {stripEvent} from '../../utils/utils'
import * as pdpActions from './actions'
import {getSelectorFromState} from '../../utils/router-utils'

class PDP extends React.Component {
    shouldComponentUpdate(newProps) {
        return !Immutable.is(newProps.pdp, this.props.pdp) || !Immutable.is(newProps.catalogProduct, this.props.catalogProduct)
    }

    render() {
        const {
            itemQuantity,
            quantityAdded,
            itemAddedModalOpen,
            formInfo,
            contentsLoaded
        } = this.props.pdp.toJS()

        const product = this.props.catalogProduct.toJS()

        const {
            title,
            price,
            description,
            carouselItems
        } = product

        const {
            setQuantity,
            addToCart,
            closeItemAddedModal
        } = this.props

        const coverage = window.innerHeight <= 455 ? "56%" : "50%"

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
                        coverage={coverage}
                    />
                }
            </div>
        )
    }
}

PDP.propTypes = {
    /**
     * Function to submit the add-to-cart form
     */
    addToCart: PropTypes.func.isRequired,
    /**
     * Product data from state (Catalog -> Products)
     */
    catalogProduct: PropTypes.object.isRequired,
    /**
     * Callback when the added-to-cart modal closes
     */
    closeItemAddedModal: PropTypes.func.isRequired,
    /**
     * The Immutable.js PDP state object
     */
    pdp: PropTypes.object.isRequired,
    /**
     * Function to update the item quantity when user changes it
     */
    setQuantity: PropTypes.func.isRequired,
}

export const mapStateToProps = ({catalog, pdp}) => {
    const selector = getSelectorFromState(pdp)
    return {
        catalogProduct: catalog.products.get(selector),
        pdp: pdp.get(selector)
    }
}

const mapDispatchToProps = {
    setQuantity: pdpActions.setItemQuantity,
    addToCart: stripEvent(pdpActions.submitCartForm),
    closeItemAddedModal: stripEvent(pdpActions.closeItemAddedModal)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PDP)
