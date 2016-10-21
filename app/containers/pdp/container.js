import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
// import Link from 'progressive-web-sdk/dist/components/link'
import Carousel from 'progressive-web-sdk/dist/components/carousel'
import CarouselItem from 'progressive-web-sdk/dist/components/carousel/carousel-item'
import {Accordion, AccordionItem} from 'progressive-web-sdk/dist/components/accordion'
// import Image from 'progressive-web-sdk/dist/components/image'

import * as pdpActions from './actions'

const PDPHeading = ({title, price}) => (
    <div className="c-pdp-heading">
        <h1 className="c-pdp-heading__title">{title}</h1>
        <p className="c-pdp-heading__price">{price}</p>
    </div>
)

PDPHeading.propTypes = {
    price: PropTypes.string,
    title: PropTypes.string
}

const PDPCarousel = ({items}) => (
    <div className="c-pdp-carousel">
        <Carousel>
            {items.map((item) => {
                return (
                    <CarouselItem key={item.position}>
                        <img src={item.img} />
                    </CarouselItem>
                )
            })}
        </Carousel>
    </div>
)

PDPCarousel.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object)
}

const PDPDescription = ({description}) => (
    <div className="c-pdp-description">
        <Accordion>
            <AccordionItem header="Product Description" closeIconName="x">
                <p>{description}</p>
            </AccordionItem>
        </Accordion>
    </div>
)

PDPDescription.propTypes = {
    description: PropTypes.string
}

const PDPAddToCart = () => false

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
    fetchContents: PropTypes.func.isRequired,
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

export const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchContents: () => dispatch(pdpActions.fetchContents())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PDP)
