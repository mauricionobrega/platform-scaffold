import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getHasProducts, getSearchResultProducts, getNoResultsText} from '../selectors'

import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import List from 'progressive-web-sdk/dist/components/list'
import Image from 'progressive-web-sdk/dist/components/image'
import ProductTile from '../../../components/product-tile'

const ResultList = ({products}) => (
    <List className="c--borderless">
        {products.map((product, idx) => (<ProductTile key={idx} {...product} />))}
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
            your search returned no results. Please check your spelling and try searching again.
        </div>
    </div>
)

NoResultsList.propTypes = {
    bodyText: PropTypes.string
}

const SearchResultContent = ({hasProducts, products, noResultsText}) => (
    <div>
        {hasProducts ?
            <ResultList products={products} />
        :
            <NoResultsList bodyText={noResultsText} />
        }
    </div>

)

SearchResultContent.propTypes = {
    hasProducts: PropTypes.bool,
    noResultsText: PropTypes.string,
    products: PropTypes.array,
}

const mapStateToProps = createPropsSelector({
    hasProducts: getHasProducts,
    products: getSearchResultProducts,
    noResultsText: getNoResultsText
})

export default connect(mapStateToProps)(SearchResultContent)
