import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

import Image from 'progressive-web-sdk/dist/components/image'
import Link from 'progressive-web-sdk/dist/components/link'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import ProductTile from './partials/product-tile'
import {SELECTOR} from './constants'

const renderResults = (products) => {
    return products.map((product, idx) => <ProductTile className="t-plp__grid-item" key={idx} product={product} />)
}

const renderNoResults = (bodyText) => {
    return (
        <div>
            <Image alt="No results" className="t-plp__no-results-image" src={getAssetUrl('static/img/no-results.png')} />
            <div className="t-plp__no-results-text u-text-align-center">
                {bodyText}
            </div>
        </div>
    )
}

const PLP = ({hasProducts, isPlaceholder, noResultsText, numItems, products, title}) => {
    return (
        <div className="t-plp">
            <div className="t-plp__heading u-padding-top-md u-padding-end-0 u-padding-bottom-lg u-padding-start-md">
                <div>
                    <Link href="/">Home</Link>
                </div>
                <div className="u-margin-top-md">
                    {isPlaceholder ?
                        <SkeletonText lines={1} type="h1" width="100px" />
                    :
                        <h1 className="u-text-lighter u-text-uppercase">{title}</h1>
                    }
                </div>

                <div className="t-plp__heading-logo">
                    {isPlaceholder ?
                        <SkeletonBlock height="51px" width="61px" />
                    :
                        <Image
                            alt="Heading logo"
                            height="51px"
                            src={getAssetUrl(`static/img/${title.trim().toLowerCase()}.png`)}
                            width="61px"
                        />
                    }
                </div>
            </div>
            <div className="t-plp__container">
                {isPlaceholder ?
                    <SkeletonBlock height="32px" />
                :
                    <div className="t-plp__num-results u-margin-top-0 u-margin-end-md u-margin-bottom-md u-margin-start-md">
                        {numItems} Results
                    </div>
                }
                <div className="u-clearfix u-padding-start u-padding-end">
                    {hasProducts ? renderResults(products) : renderNoResults(noResultsText)}
                </div>
            </div>
        </div>
    )
}

PLP.propTypes = {
    /**
     * When there were products found on the page, this is set to true
     */
    hasProducts: PropTypes.bool.isRequired,
    /**
     * Whether we are currently in a placeholder state, or have page content to
     * display
     */
    isPlaceholder: PropTypes.bool.isRequired,
    /**
     * The text to display when no products were found
     */
    noResultsText: PropTypes.string.isRequired,
    /**
     * The number of products found
     */
    numItems: PropTypes.string.isRequired,
    /**
     * The array of parsed products
     */
    products: PropTypes.array.isRequired,
    /**
     * The PLP title (i.e. Potions, Ingredients, etc.)
     */
    title: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
    const selector = state.plp.get(SELECTOR)

    return {
        ...state.plp.get(selector).toJS(),
    }
}

export default connect(
    mapStateToProps
)(PLP)
