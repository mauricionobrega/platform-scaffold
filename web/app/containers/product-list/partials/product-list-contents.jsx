import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as selectors from '../selectors'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

import List from 'progressive-web-sdk/dist/components/list'
import Image from 'progressive-web-sdk/dist/components/image'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

import ProductTile from './product-tile'

const noResultsText = 'We can\'t find products matching the selection'

const ResultList = ({products}) => (
    <List className="c--borderless">
        {products.map((product, idx) => <ProductTile key={idx} {...product} />)}
    </List>
)

ResultList.propTypes = {
    products: PropTypes.array
}

const NoResultsList = () => (
    <div className="u-flexbox u-direction-column u-align-center">
        <Image
            className="u-flex-none"
            alt="Crystal Ball"
            width="122px"
            height="110px"
            src={getAssetUrl('static/img/global/no-results.png')} />

        <div className="t-product-list__no-results-text u-text-align-center">
            {noResultsText}
        </div>
    </div>
)

NoResultsList.propTypes = {
    bodyText: PropTypes.string
}

const ProductListContents = ({contentsLoaded, numItems, products}) => (
    <div className="t-product-list__container u-padding-end u-padding-bottom-lg u-padding-start">
        <div className="t-product-list__num-results u-padding-md">
            {contentsLoaded ?
                <span className="u-text-semi-bold">{numItems} Results</span>
                    :
                <SkeletonBlock height="20px" />
            }
        </div>

        {(products.length > 0 || !contentsLoaded) ? <ResultList products={products} /> : <NoResultsList />}
    </div>
)

ProductListContents.propTypes = {
    products: PropTypes.array.isRequired,
    contentsLoaded: PropTypes.bool,
    numItems: PropTypes.number
}

const mapStateToProps = createPropsSelector({
    contentsLoaded: selectors.getProductListContentsLoaded,
    numItems: selectors.getNumItems,
    products: selectors.getProductListProducts
})


export default connect(mapStateToProps)(ProductListContents)
