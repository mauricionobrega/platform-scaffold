import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'

import PDPHeading from './partials/pdp-heading'
import PDPCarousel from './partials/pdp-carousel'
import PDPDescription from './partials/pdp-description'
import PDPAddToCart from './partials/pdp-add-to-cart'
import * as pdpActions from './actions'

class PDP extends React.Component {
    shouldComponentUpdate(newProps) {
        return !Immutable.is(newProps.pdp, this.props.pdp)
    }

    render() {
        const {
            pdp,
            setQuantity,
            addToCart
        } = this.props

        const {
            contentsLoaded = false,
            product = {},
            itemQuantity = 1,
            formInfo = {}
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
        addToCart: () => dispatch(pdpActions.submitCartForm())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PDP)
