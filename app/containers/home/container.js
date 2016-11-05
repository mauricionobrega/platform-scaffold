import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import Immutable from 'immutable'

import Carousel from 'progressive-web-sdk/dist/components/carousel'
import CarouselItem from 'progressive-web-sdk/dist/components/carousel/carousel-item'
import Image from 'progressive-web-sdk/dist/components/image'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import HomeCategory from './partials/home-category'

import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

const cardClasses = classNames(
    't-home__category',
    'u-margin-top-md',
    'u-margin-end',
    'u-margin-start',
    'u-padding'
)

class Home extends React.Component {
    shouldComponentUpdate(nextProps) {
        return !Immutable.is(this.props.homeState, nextProps.homeState)
    }

    render() {
        const {banners, categories} = this.props

        return (
            <div className="t-home__container u-padding-bottom-md">
                {banners ?
                    <Carousel allowLooping={true} className="c--full-width c--hide-controls">
                        {banners.map(({src, href, alt}, key) => { // TODO: fix this when we put mobile assets on desktop
                            return (
                                <CarouselItem href={href} key={key}>
                                    <Image
                                        src={getAssetUrl(`static/img/homepage_carousel/${key}.png`)}
                                        alt={alt}
                                        hidePlaceholder={true}
                                        loadingIndicator={<SkeletonBlock height="84vw" />}
                                    />
                                </CarouselItem>
                            )
                        })}
                    </Carousel>
                :
                    // The ratio of the banner image width:height is 1:.84.
                    // Since the banner will be width=100%, we can use 84vw to predict the banner height.
                    <SkeletonBlock height="84vw" />
                }
                <div className={cardClasses}>
                    {categories.map((category, key) => <HomeCategory {...category} key={key} />)}
                </div>
            </div>
        )
    }
}

Home.propTypes = {
    banners: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.array
    ]).isRequired,
    categories: PropTypes.array.isRequired,
    homeState: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        homeState: state.home,
        ...state.home.toJS()
    }
}

export default connect(
    mapStateToProps
)(Home)
