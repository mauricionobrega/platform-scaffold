import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import * as selectors from '../selectors'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import {selectorToJS} from '../../../utils/selector-utils'

import List from 'progressive-web-sdk/dist/components/list'
import Image from 'progressive-web-sdk/dist/components/image'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

import ProductTile from './product-tile'

const ResultList = ({products}) => (
    <List className="c--borderless">
        {products.map((product, idx) => <ProductTile key={idx} product={product} />)}
    </List>
)

ResultList.propTypes = {
    products: PropTypes.array
}

const NoResultsList = ({bodyText}) => (
    <List className="c--borderless">
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
    </List>
)

NoResultsList.propTypes = {
    bodyText: PropTypes.string
}

const PLPContents = ({contentsLoaded, numItems, products, hasProducts, noResultsText}) => (
    <div className="t-plp__container u-padding-end u-padding-bottom-lg u-padding-start">
        <div className="t-plp__num-results u-padding-md">
            {contentsLoaded ?
                <span className="u-text-semi-bold">{numItems} Results</span>
                    :
                <SkeletonBlock height="20px" />
            }
        </div>

        {hasProducts && contentsLoaded ? <ResultList products={products} /> : <NoResultsList bodyText={noResultsText} />}
    </div>
)

PLPContents.propTypes = {
    products: PropTypes.array.isRequired,
    contentsLoaded: PropTypes.bool,
    hasProducts: PropTypes.bool,
    noResultsText: PropTypes.string,
    numItems: PropTypes.string
}

const mapStateToProps = createStructuredSelector({
    hasProducts: selectors.getHasProducts,
    contentsLoaded: selectors.getPlpContentsLoaded,
    noResultsText: selectors.getNoResultsText,
    numItems: selectors.getNumItems,
    products: selectorToJS(selectors.getPlpProducts)
})


export default connect(mapStateToProps)(PLPContents)
