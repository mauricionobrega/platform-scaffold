import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
// import Link from 'progressive-web-sdk/dist/components/link'
// import Image from 'progressive-web-sdk/dist/components/image'
import PDPHeading from './partials/pdp-heading'
import PDPCarousel from './partials/pdp-carousel'
import PDPDescription from './partials/pdp-description'

const PDPAddToCart = () => false

class PDP extends React.Component {
    // TODO control update with Immutable object.
    shouldComponentUpdate(newProps) {
        return (newProps.contentsLoaded === this.props.contentsLoaded) &&
            (newProps.product === this.props.product)
    }

    render() {
        const {
            contentsLoaded,
            product
        } = this.props

        if (!contentsLoaded) {
            return false
        }

        return (
            <div className="c-pdp">
                <PDPHeading {...product} />
                <PDPCarousel items={product.carouselItems} />
                <PDPDescription description={product.description} />
                <PDPAddToCart />
            </div>
        )
    }
}

PDP.propTypes = {
    contentsLoaded: PropTypes.bool,
    product: PropTypes.object
}

PDP.defaultProps = {
    contentsLoaded: false,
    product: {}
}

export const mapStateToProps = (state) => {
    return {
        ...state.pdp.toJS()
    }
}

// export const mapDispatchToProps = (dispatch, props) => {
//     return {
//         fetchContents: () => dispatch(pdpActions.fetchContents())
//     }
// }

export default connect(
    mapStateToProps
)(PDP)
