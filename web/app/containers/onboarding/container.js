import React from 'react'

import CarouselItem from 'progressive-web-sdk/dist/components/carousel/carousel-item'
import Carousel from 'progressive-web-sdk/dist/components/carousel'
import Button from 'progressive-web-sdk/dist/components/button'
import Astro from '../../vendor/astro-client'

const Onboarding = ({carouselData}) => {
    const carouselItems = carouselData.map((data, index) => {
        return <OnboardingScreen data={data} key={index} index={index} isLast={index === carouselData.length - 1} />
    })
    return (
        <Carousel>
            {carouselItems}
        </Carousel>
    )
}

const onLaterTapped = () => {
    Astro.jsRpcMethod('onboardingHide', [])()
}

const OnboardingScreen = (props) => {
    const data = props.data
    const item = (
        <CarouselItem caption="Get started" key={props.index} className="carousel-item" allowLooping="false">
            <div className="carousel-item-wrapper u-direction-column">
                <div className="u-flex u-flexbox u-align-center u-justify-center">
                    <div>
                        <img src={data.imageURL} className="carousel-item-image" alt={data.imageAlt} />
                        {data.title &&
                            <h2 className="item-title u-color-neutral-60 u-text-font-family u-text-semi-bold">{data.title}</h2>
                        }
                        <p className="item-subtitle u-text-font-family">{data.subtitle}</p>
                    </div>
                </div>
                {data.primaryButtonTitle &&
                    <div className="u-flexbox u-flexbox-gutters button-wrapper">
                        <Button text={data.primaryButtonTitle} className="c--primary u-flex" />
                    </div>
                }
                <div className="u-flexbox u-flexbox-gutters button-wrapper">
                    {props.isLast &&
                        <Button className="c--tertiary u-flex" text={data.laterButtonTitle} onClick={onLaterTapped} />
                    }
                    <Button className="c--secondary u-flex" text={data.actionButtonTitle} />
                </div>
            </div>
        </CarouselItem>
    )
    return item
}

Onboarding.propTypes = {
    carouselData: React.PropTypes.object
}

export default Onboarding
