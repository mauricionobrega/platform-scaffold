import React from 'react'

import CarouselItem from 'progressive-web-sdk/dist/components/carousel/carousel-item'
import Carousel from 'progressive-web-sdk/dist/components/carousel'
import Button from 'progressive-web-sdk/dist/components/button'

const Onboarding = ({carouselData}) => {
    const carouselItems = Object.keys(carouselData).map((key, index) => {
        return <OnboardingScreen {...carouselData[key]} key={index} />
    })
    return (
        <Carousel>
            {carouselItems}
        </Carousel>
    )
}

const OnboardingScreen = ({imageURL, imageAlt, title, subtitle, primaryButton, laterButton, actionButton, key}) => {
    const item = (
        <CarouselItem caption="Get started" key={key} className="carousel-item" allowLooping="false">
            <div className="carousel-item-wrapper u-direction-column">
                <div className="u-flex u-flexbox u-align-center u-justify-center">
                    <div>
                        <img src={imageURL} className="carousel-item-image" alt={imageAlt} />
                        {title &&
                            <h2 className="item-title u-color-neutral-60 u-text-font-family u-text-semi-bold">{title}</h2>
                        }
                        <p className="item-subtitle u-text-font-family">{subtitle}</p>
                    </div>
                </div>
                {primaryButton &&
                    <div className="u-flexbox u-flexbox-gutters button-wrapper">
                        <Button text={primaryButton.title} className="c--primary u-flex" onClick={primaryButton.action} />
                    </div>
                }
                <div className="u-flexbox u-flexbox-gutters button-wrapper">
                    {laterButton &&
                        <Button className="c--tertiary u-flex" text={laterButton.title} onClick={laterButton.action} />
                    }
                    {actionButton &&
                        <Button className="c--secondary u-flex" text={actionButton.title} onClick={actionButton.action} />
                    }
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
