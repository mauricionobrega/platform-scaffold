import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
// import Link from 'progressive-web-sdk/dist/components/link'
import Carousel from 'progressive-web-sdk/dist/components/carousel'
import CarouselItem from 'progressive-web-sdk/dist/components/carousel/carousel-item'
// import Image from 'progressive-web-sdk/dist/components/image'

import * as pdpActions from './actions'

class PDP extends React.Component {
    componentDidMount() {
        this.props.fetchContents()
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
            <div>
                <h1>{product.title}</h1>
                <p>{product.price}</p>
                <Carousel>
                    {product.carouselItems.map((item) => {
                        return (
                            <CarouselItem key={item.position}>
                                <img src={item.img} />
                            </CarouselItem>
                        )
                    })}
                </Carousel>
                <p>{product.description}</p>
            </div>
        )
    }
}

PDP.propTypes = {
    body: PropTypes.string,
    contentsLoaded: PropTypes.bool,
    fetchContents: PropTypes.func,
    product: PropTypes.object
}

PDP.defaultProps = {
    body: '',
    contentsLoaded: false,
    product: {}
}

export const mapStateToProps = (state) => {
    return {
        ...state.pdp.toJS()
    }
}

export const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchContents: () => dispatch(pdpActions.fetchContents())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PDP)
