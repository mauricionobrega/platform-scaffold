import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import {createStructuredSelector} from 'reselect'
import {selectorToJS} from '../../utils/selector-utils'

import * as selectors from './selectors'
import Image from 'progressive-web-sdk/dist/components/image'
import Link from 'progressive-web-sdk/dist/components/link'
import List from 'progressive-web-sdk/dist/components/list'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import ProductTile from './partials/product-tile'

const renderResults = (products) => {
    return products.map((product, idx) => <ProductTile key={idx} product={product} />)
}

const renderNoResults = (bodyText) => {
    return (
        <div className="u-flexbox u-direction-column u-align-center">
            <Image
                className="u-flex-none"
                alt="Crystal Ball"
                width="122px"
                height="110px"
                src={getAssetUrl('static/img/global/no-results.png')} />

            <div className="t-plp__no-results-text u-text-align-center">
                {bodyText}
            </div>
        </div>
    )
}

const PLP = ({hasProducts, contentsLoaded, noResultsText, numItems, title, products}) => {
    return (
        <div className="t-plp">
            <div className="u-flexbox u-align-bottom">
                <div className="u-flex u-padding-top-lg u-padding-bottom-lg u-padding-start-md">
                    <div className="t-plp__breadcrumb">
                        <Link href="/" className="u-text-small">Home</Link>
                    </div>

                    <div className="u-margin-top-md">
                        {contentsLoaded ?
                            <h1 className="u-text-lighter u-text-uppercase">{title}</h1>
                        :
                            <SkeletonText lines={1} type="h1" width="100px" />
                        }
                    </div>
                </div>

                {title &&
                    <Image
                        className="u-flex-none u-padding-end u-padding-bottom-sm"
                        alt="Heading logo"
                        height="60px"
                        width="60px"
                        src={getAssetUrl(`static/img/categories/${title.trim().replace(/\s+/g, '-')
                        .toLowerCase()}@2x.png`)}
                    />
                }
            </div>

            <div className="t-plp__container u-padding-end u-padding-bottom-lg u-padding-start">
                <div className="t-plp__num-results u-padding-md">
                    {contentsLoaded ?
                        <span className="u-text-semi-bold">{numItems} Results</span>
                    :
                        <SkeletonBlock height="20px" />
                    }
                </div>

                <List className="c--borderless">
                    {hasProducts ? renderResults(products) : renderNoResults(noResultsText)}
                </List>
            </div>
        </div>
    )
}


PLP.propTypes = {
    /**
     * Product data from state (Catalog -> Products), filtered by the productUrls in the Plp state object
     */
    products: PropTypes.array.isRequired,
    contentsLoaded: PropTypes.bool,
    hasProducts: PropTypes.bool,
    noResultsText: PropTypes.string,
    numItems: PropTypes.string,
    title: PropTypes.string
}

const mapStateToProps = createStructuredSelector({
    hasProducts: selectors.getHasProducts,
    contentsLoaded: selectors.getPlpContentsLoaded,
    noResultsText: selectors.getNoResultsText,
    numItems: selectors.getNumItems,
    title: selectors.getPlpTitle,
    products: selectorToJS(selectors.getPlpProducts)
})

export default connect(
    mapStateToProps
)(PLP)
