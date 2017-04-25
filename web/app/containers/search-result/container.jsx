import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

import {getSearchResultTitle, getHasProducts, getSearchResultProducts} from './selectors'

// import * as searchResultActions from './actions'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

import ProductTile from '../product-list/partials/product-tile'
import List from 'progressive-web-sdk/dist/components/list'
import Link from 'progressive-web-sdk/dist/components/link'


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
const titleClass = `${containerClass}__title`

const SearchResult = ({hasProducts, products, title}) => (
    <div className={containerClass}>
        <div className="u-flex u-padding-top-lg u-padding-bottom-lg u-padding-start-md">
            {!isRunningInAstro &&
                <div className="t-product-list__breadcrumb">
                    <Link href="/" className="u-text-small">Home</Link>
                </div>
            }
            <div className="u-margin-top-md">
                {title ?
                    <h1 className={titleClass}>{title}</h1>
                :
                    <SkeletonText lines={1} type="h1" width="100px" />
                }
            </div>
        </div>

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
    title: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    title: getSearchResultTitle,
    hasProducts: getHasProducts,
    products: getSearchResultProducts,
})

const mapDispatchToProps = {
    // setTitle: searchResultActions.setTitle
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResult)
