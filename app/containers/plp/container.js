import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

import Image from 'progressive-web-sdk/dist/components/image'
import Link from 'progressive-web-sdk/dist/components/link'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'
import ProductTile from '../../components/product-tile'
import {SELECTOR} from './constants'

const renderResults = (products) => {
    return products.map((product, idx) => <ProductTile className="c-grid__item" key={idx} product={product} />)
}

const renderNoResults = (bodyText) => {
    return (
        <div>
            <Image alt="No results" className="no-results__image" src={getAssetUrl('static/img/no-results.png')} />
            <div className="no-results__text">
                {bodyText}
            </div>
        </div>
    )
}

const PLP = ({hasProducts, isPlaceholder, noResultsText, numItems, products, title}) => {
    return (
        <div className="t-plp">
            <div className="heading">
                <div>
                    <Link href="/">Home</Link>
                </div>
                {isPlaceholder ?
                    <SkeletonText lines={1} type="h1" width="100px" />
                :
                    <h1>{title}</h1>
                }

                <Image
                    alt="Heading logo"
                    className="heading-logo"
                    height="51px"
                    src={isPlaceholder ? '' : getAssetUrl(`static/img/${title.trim().toLowerCase()}.png`)}
                    width="61px"
                />
            </div>
            <div className="container">
                {isPlaceholder ?
                    <SkeletonText lines={1} width="85px" />
                :
                    <div className="num-results">
                        {numItems} Results
                    </div>
                }
                <div className="c-grid grid-container">
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
