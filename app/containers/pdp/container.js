import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'
// import Link from 'progressive-web-sdk/dist/components/link'
// import Image from 'progressive-web-sdk/dist/components/image'
import PDPHeading from './partials/pdp-heading'
import PDPCarousel from './partials/pdp-carousel'
import PDPDescription from './partials/pdp-description'
import * as pdpActions from './actions'

const PDPAddToCart = () => false

class PDP extends React.Component {
    shouldComponentUpdate(newProps) {
        return Immutable.is(newProps.pdp, this.props.pdp)
    }

    render() {
        const {
            pdp,
            setQuantity
        } = this.props

        const {
            contentsLoaded,
            product,
            itemQuantity
        } = pdp.toJS()


        if (!contentsLoaded) {
            return false
        }

        return (
            <div className="c-pdp">
                <PDPHeading {...product} />
                <PDPCarousel items={product.carouselItems} />
                <PDPDescription description={product.description} />
                <PDPAddToCart quantity={itemQuantity} setQuantity={setQuantity} />
            </div>
        )
    }
}

PDP.propTypes = {
    contentsLoaded: PropTypes.bool,
    itemQuantity: PropTypes.number,
    product: PropTypes.object,
    setQuantity: PropTypes.func
}

PDP.defaultProps = {
    contentsLoaded: false,
    product: {},
    itemQuantity: 1
}

export const mapStateToProps = ({pdp}) => ({pdp})

export const mapDispatchToProps = (dispatch, props) => {
    return {
        setQuantity: (quantity) => dispatch(pdpActions.setItemQuantity(quantity))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PDP)
