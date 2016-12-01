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
import {getRoutedState} from '../../utils/router-utils'

class PDP extends React.Component {
    shouldComponentUpdate(newProps) {
        return !Immutable.is(newProps.routedState, this.props.routedState)
    }

    render() {
        const {
            product,
            itemQuantity,
            quantityAdded,
            itemAddedModalOpen,
            formInfo,
            isPlaceholder,
            contentsLoaded
        } = this.props.routedState.toJS()
        const {
            setQuantity,
            addToCart,
            closeItemAddedModal
        } = this.props

        const {
            carouselItems,
            description
        } = product

        return (
            <div className="t-pdp">
                <PDPHeading {...product} />

                <PDPCarousel items={carouselItems} />

                <PDPDescription description={description} />

                <PDPAddToCart
                    formInfo={formInfo}
                    quantity={itemQuantity}
                    setQuantity={setQuantity}
                    onSubmit={addToCart}
                    disabled={!contentsLoaded}
                />

                {!isPlaceholder && contentsLoaded &&
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
     * The Immutable.js state object, for use with shouldComponentUpdate
     */
    routedState: PropTypes.object.isRequired,
    /**
     * Function to update the item quantity when user changes it
     */
    setQuantity: PropTypes.func.isRequired,
}

export const mapStateToProps = ({pdp}) => ({routedState: getRoutedState(pdp)})

const mapDispatchToProps = {
    setQuantity: pdpActions.setItemQuantity,
    addToCart: stripEvent(pdpActions.submitCartForm),
    closeItemAddedModal: stripEvent(pdpActions.closeItemAddedModal)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PDP)
