import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'

import PDPHeading from './partials/pdp-heading'
import PDPCarousel from './partials/pdp-carousel'
import PDPDescription from './partials/pdp-description'
import PDPAddToCart from './partials/pdp-add-to-cart'
import PDPItemAddedModal from './partials/pdp-item-added-modal'
import * as pdpActions from './actions'
import {getRoutedState} from '../../utils/router-utils'

import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'

class PDP extends React.Component {
    shouldComponentUpdate(newProps) {
        return !Immutable.is(newProps.routedState, this.props.routedState)
    }

    render() {
        const {
            setQuantity,
            addToCart,
            closeItemAddedModal,
            product,
            itemQuantity,
            quantityAdded,
            itemAddedModalOpen,
            isPlaceholder
        } = this.props

        const {
            carouselItems,
            description
        } = product

        return (
            <div className="t-pdp">
                <PDPHeading {...product} />
                <PDPCarousel items={carouselItems} />
                {!isPlaceholder ?
                    <div>
                        <PDPDescription
                            description={description} />
                        <PDPAddToCart
                            quantity={itemQuantity}
                            setQuantity={setQuantity}
                            onSubmit={addToCart} />
                        <PDPItemAddedModal
                            open={itemAddedModalOpen}
                            onDismiss={closeItemAddedModal}
                            product={product}
                            quantity={quantityAdded} />
                    </div>
                :
                    <div className="u-padding-md">
                        <SkeletonText lines={5} width="100%" size="24px" lineClassName="u-margin-bottom" />
                    </div>
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
     * Callback when the added-to-cart modal closes
     */
    closeItemAddedModal: PropTypes.func.isRequired,
    /**
     * Whether we are currently in a placeholder state, or have page content to
     * display
     */
    isPlaceholder: PropTypes.bool.isRequired,
    /**
     * Whether or not the added-to-cart modal is open
     */
    itemAddedModalOpen: PropTypes.bool.isRequired,
    /**
     * Item quantity to add to cart
     */
    itemQuantity: PropTypes.number.isRequired,
    /**
     * The Immutable.js state object, for use with shouldComponentUpdate
     */
    routedState: PropTypes.object.isRequired,
    /**
     * Function to update the item quantity when user changes it
     */
    setQuantity: PropTypes.func.isRequired,
    /**
     * Content of the PDP page
     */
    product: PropTypes.shape({
        title: PropTypes.string.isRequired,
        price: PropTypes.string,
        carouselItems: PropTypes.array,
        description: PropTypes.string
    }),
    /**
     * Set with the quantity added after an add-to-cart action
     */
    quantityAdded: PropTypes.number

}

export const mapStateToProps = (state) => {
    const routedState = getRoutedState(state.pdp)
    return {
        routedState,
        ...routedState.toJS()
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        setQuantity: (quantity) => dispatch(pdpActions.setItemQuantity(quantity)),
        addToCart: () => dispatch(pdpActions.submitCartForm()),
        closeItemAddedModal: () => dispatch(pdpActions.closeItemAddedModal())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PDP)
