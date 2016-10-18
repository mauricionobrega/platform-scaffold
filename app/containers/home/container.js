import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import Carousel from 'progressive-web-sdk/dist/components/carousel'
import CarouselItem from 'progressive-web-sdk/dist/components/carousel/carousel-item'
import {Icon} from 'progressive-web-sdk/dist/components/icon'
import Image from 'progressive-web-sdk/dist/components/image'
import List from 'progressive-web-sdk/dist/components/list'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'

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

        // TODO: setup placeholders
        return (
            <div className="">
                {banners.length > 1 &&
                    <Carousel allowLooping={true}>
                        {banners.map(({src, href, alt}, key) => {
                            return (
                                <CarouselItem href={href} key={key}>
                                    <Image src={src} alt={alt} />
                                </CarouselItem>
                            )
                        })}
                    </Carousel>
                }
                <div className="">
                    {categories.map(({href, imgSrc, text}, key) => {
                        return (
                            <ListTile
                                href={href}
                                startAction={<Image src={getAssetUrl(`static/img/${text.trim().toLowerCase()}.png`)} alt={text} height={"60px"} width={"60px"}/>}
                                endAction={<Icon name="chevron-right" style={{"height":"16px","width":"16px"}}/>}
                                includeEndActionInPrimary={true}
                                key={key}
                            >
                                <div className="">SHOP</div>
                                <div className="">{text}</div>
                            </ListTile>
                        )
                    })}
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
