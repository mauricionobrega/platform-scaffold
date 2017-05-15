/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'

import CarouselItem from 'progressive-web-sdk/dist/components/carousel/carousel-item'
import Carousel from 'progressive-web-sdk/dist/components/carousel'
import Button from 'progressive-web-sdk/dist/components/button'

const OnboardingScreen = ({imageURL, imageAlt, title, subtitle, primaryButton, laterButton, actionButton, key}) => {
    return (
        <CarouselItem caption="Get started" key={key} className="carousel-item">
            <div className="carousel-item-wrapper u-direction-column">
                <div className="u-flex u-flexbox u-align-center u-justify-center">
                    <div>
                        <img src={imageURL} className="carousel-item-image" alt={imageAlt} />
                        {title &&
                            <h2 className="item-title u-color-neutral-60 u-text-family u-text-weight-medium">{title}</h2>
                        }
                        <p className="item-subtitle u-text-family">{subtitle}</p>
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
}

OnboardingScreen.propTypes = {
    actionButton: React.PropTypes.object,
    imageAlt: React.PropTypes.string,
    imageURL: React.PropTypes.string,
    key: React.PropTypes.string,
    laterButton: React.PropTypes.object,
    primaryButton: React.PropTypes.object,
    subtitle: React.PropTypes.string,
    title: React.PropTypes.string
}

const Onboarding = ({carouselData}) => {
    return (
        <Carousel allowLooping={false}>
            {Object.keys(carouselData).map((key) => <OnboardingScreen {...carouselData[key]} key={key} />)}
        </Carousel>
    )
}

Onboarding.propTypes = {
    carouselData: React.PropTypes.object
}

export default Onboarding
