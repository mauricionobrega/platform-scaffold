import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as selectors from '../selectors'

import {Swatch, SwatchItem} from 'progressive-web-sdk/dist/components/swatch'
import Ratio from 'progressive-web-sdk/dist/components/ratio'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import Image from 'progressive-web-sdk/dist/components/image'

const ProductDeetsGallery = ({items, contentsLoaded}) => {
// So long as we have items, display the carousel as intended!
    if (items.length) {
        const img = items[0]
        const imgProps = {
            className: contentsLoaded ? 'u-block' : 'u-block c--is-transitioning', // Carousel hasn't received the final images yet
            alt: '', // no alt text available :(
            src: img.img,
            hidePlaceholder: true,
            ratio: {aspect: '1:1'},
            loadingIndicator: <SkeletonBlock height="100%" />,
            useLoaderDuringTransitions: false
        }
        return (
            <div>
                <div>
                    <Image {...imgProps} />
                </div>
                <div className="t-product-deets-gallery u-padding-md u-box-shadow u-position-relative u-z-index-1">
                    <Swatch>
                        <SwatchItem value="color1">
                            <Image
                                width="50px"
                                height="50px"
                                src="https://placehold.it/50x50"
                                alt="Color 1"
                            />
                        </SwatchItem>
                        <SwatchItem value="color2">
                            <Image
                                width="50px"
                                height="50px"
                                src="https://placehold.it/50x50"
                                alt="Color 2"
                            />
                        </SwatchItem>
                        <SwatchItem value="color3">
                            <Image
                                width="50px"
                                height="50px"
                                src="https://placehold.it/50x50"
                                alt="Color 3"
                            />
                        </SwatchItem>
                    </Swatch>
                </div>
            </div>
        )
    }

    // If there are NO ITEMS then display a placeholder skeleton instead
    return (
        <div>
            <Ratio aspect="1:1">
                <SkeletonBlock
                    height="100%"
                    width="100%"
                    className="u-padding-md"
                />
            </Ratio>
            <SkeletonBlock height="30px" />
        </div>
    )
}

ProductDeetsGallery.defaultProps = {
    items: []
}

ProductDeetsGallery.propTypes = {
    contentsLoaded: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.shape({
        position: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
    }))
}

const mapStateToProps = createPropsSelector({
    contentsLoaded: selectors.getProductDeetsContentsLoaded,
    items: selectors.getProductCarouselItems
})

export default connect(mapStateToProps)(ProductDeetsGallery)
