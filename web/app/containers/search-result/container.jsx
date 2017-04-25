import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getHasProducts, getSearchResultProducts} from './selectors'

import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import List from 'progressive-web-sdk/dist/components/list'
import ProductTile from '../../components/product-tile'
import SearchResultHeader from './partials/search-result-header'
import {isRunningInAstro} from '../../utils/astro-integration'


const ResultList = ({products}) => (
    <List className="c--borderless">
        {products.map((product, idx) => (<ProductTile key={idx} {...product} />))}
    </List>
)

ResultList.propTypes = {
    products: PropTypes.array
}

const containerClass = 't-search-result'

const SearchResult = ({hasProducts, products}) => (
    <div className={containerClass}>
        {!isRunningInAstro &&
            <SearchResultHeader />
        }
        <div>
            {hasProducts ?
                <ResultList products={products} />
                    :
                <SkeletonBlock height="50px" />
            }
        </div>
    </div>
)

SearchResult.propTypes = {
    hasProducts: PropTypes.bool,
    products: PropTypes.array,
}

const mapStateToProps = createPropsSelector({
    hasProducts: getHasProducts,
    products: getSearchResultProducts,
})

export default connect(mapStateToProps)(SearchResult)
