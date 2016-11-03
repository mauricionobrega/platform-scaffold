import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'

import PDPHeading from './partials/pdp-heading'
import PDPCarousel from './partials/pdp-carousel'
import PDPDescription from './partials/pdp-description'
import PDPAddToCart from './partials/pdp-add-to-cart'
import PDPItemAddedModal from './partials/pdp-item-added-modal'
import * as pdpActions from './actions'

class PDP extends React.Component {
    shouldComponentUpdate(newProps) {
        return !Immutable.is(newProps.pdp, this.props.pdp)
    }

    render() {
        const {
            pdp,
            setQuantity,
            addToCart,
            closeItemAddedModal
        } = this.props

        const {
            contentsLoaded = false,
            product = {},
            itemQuantity = 1,
            quantityAdded = 0,
            formInfo = {},
            itemAddedModalOpen = false
        } = pdp.toJS()

        if (!contentsLoaded) {
            return false
        }

        return (
            <div className="t-pdp">
                <PDPHeading {...product} />
                <PDPCarousel items={product.carouselItems} />
                <PDPDescription description={product.description} />
                <PDPAddToCart formInfo={formInfo} quantity={itemQuantity} setQuantity={setQuantity} onSubmit={addToCart} />
                <PDPItemAddedModal open={itemAddedModalOpen} onDismiss={closeItemAddedModal} product={product} quantity={quantityAdded}/>
            </div>
        )
    }
}

PDP.propTypes = {
    pdp: PropTypes.object.isRequired,
    addToCart: PropTypes.func,
    setQuantity: PropTypes.func
}


export const mapStateToProps = ({pdp}) => ({pdp})

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
