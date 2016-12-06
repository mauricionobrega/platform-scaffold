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

export class PDP extends React.Component {
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
            product,
            itemQuantity,
            quantityAdded,
            formInfo,
            itemAddedModalOpen,
            contentsLoaded
        } = pdp.toJS()

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
}

PDP.propTypes = {
    pdp: PropTypes.object.isRequired,
    addToCart: PropTypes.func,
    closeItemAddedModal: PropTypes.func,
    setQuantity: PropTypes.func
}


const mapStateToProps = ({pdp}) => ({pdp})

const mapDispatchToProps = {
    setQuantity: pdpActions.setItemQuantity,
    addToCart: stripEvent(pdpActions.submitCartForm),
    closeItemAddedModal: stripEvent(pdpActions.closeItemAddedModal)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PDP)
