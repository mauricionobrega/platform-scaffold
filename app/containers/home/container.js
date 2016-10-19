import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import Carousel from 'progressive-web-sdk/dist/components/carousel'
import CarouselItem from 'progressive-web-sdk/dist/components/carousel/carousel-item'
import {Icon} from 'progressive-web-sdk/dist/components/icon'
import Image from 'progressive-web-sdk/dist/components/image'
import List from 'progressive-web-sdk/dist/components/list'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'

import Logo from '../../components/logo'

import {mobifyGa} from 'progressive-web-sdk/dist/analytics'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

import * as homeActions from './actions'

class Home extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.triggerTapEvent = this.triggerTapEvent.bind(this)
    }

    componentDidMount() {
        this.props.fetchHomeContents()
    }

    triggerTapEvent() {
        // mobifyGa is a proxy method which sends events to our
        // ga loaded through a.js. These events also proxy
        // to Mobify's Engagement Engage. To understand how
        // to trigger mobifyGa, please reference the GA documentation:
        // https://developers.google.com/analytics/devguides/collection/analyticsjs/
        mobifyGa('send', {
            hitType: 'event',
            eventCategory: 'ui',
            eventAction: 'tap',
            eventLabel: 'sample component'
        })
    }

    render() {
        const {
            categories,
            banners
        } = this.props

        return (
            <div className="container">
                {banners.length > 1 &&
                    <Carousel allowLooping={true}>
                        {banners.map(({src, href, alt}, key) => { //TODO: fix this when we put mobile assets on desktop
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
                }
                {banners.length === 0 &&
                    // The ratio of the banner image width:height is 1:.84.
                    // Since the banner will be width=100%, we can use 84vw to predict the banner height.
                    <SkeletonBlock height="84vw" />
                }
                <div className="c-card u-margin-all">
                    {categories.length > 1 && categories.map(({href, text}, key) => {
                        const image = <Image
                            src={getAssetUrl(`static/img/categories/${text.trim().toLowerCase()}.png`)}
                            alt={text}
                            height={"60px"}
                            width={"60px"}
                            className="u-margin-end-lg"
                        />
                        const icon = <Icon
                            name="chevron-right"
                            style={{"height":"3vh","width":"3vh"}}
                            className="u-color-brand"
                        />
                        return (
                            <ListTile
                                className="c-card__section u-padding-lg"
                                href={href}
                                startAction={image}
                                endAction={icon}
                                includeEndActionInPrimary={true}
                                key={key}
                            >
                                <div className="c-card__text u-text-light u-text-all-caps">SHOP</div>
                                <div className="c-card__text u-text-lg u-text-all-caps">{text}</div>
                            </ListTile>
                        )
                    })}

                    {categories.length === 0 &&
                        [0, 1, 2, 3].map((idx) => {
                            return (
                                <ListTile
                                    className="c-card__section u-padding-lg"
                                    startAction={<SkeletonBlock height="60px" width="60px" className="u-margin-end-lg" />}
                                    key={idx}
                                >
                                    <SkeletonText className="c-card__text" lines={2} />
                                </ListTile>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

Home.propTypes = {
    fetchHomeContents: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    banners: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
    return {
        ...state.home.toJS()
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchHomeContents: () => dispatch(homeActions.fetchHomeContents())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
