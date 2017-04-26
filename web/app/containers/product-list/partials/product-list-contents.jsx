import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as selectors from '../selectors'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import {changeSort} from '../../../store/categories/actions'

import List from 'progressive-web-sdk/dist/components/list'
import Image from 'progressive-web-sdk/dist/components/image'
import Icon from 'progressive-web-sdk/dist/components/icon'
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

const ProductListContents = ({contentsLoaded, numItems, sort, sortChange, products}) => (
    <div className="t-product-list__container u-padding-end u-padding-bottom-lg u-padding-start">
        <div className="t-product-list__num-results u-padding-md">
            {contentsLoaded ?
                <div>
                    <span className="u-text-semi-bold">{numItems} Results</span>
                    <div>
                        {sort &&
                            <div>
                                <label htmlFor="sort">Sort by</label>
                                <div className="u-position-relative">
                                    <select
                                        className="t-product-list__sort-select"
                                        onChange={(e) => { sortChange(e.target.value) }}
                                        onBlur={(e) => { sortChange(e.target.value) }}
                                    >
                                        {sort.options.map((option) => <option value={option.value} key={option.value}>{option.text}</option>)}
                                    </select>
                                    <div className="t-product-list__sort-icon">
                                        <Icon name="caret-down" />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
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
    numItems: PropTypes.number,
    sort: PropTypes.object,
    sortChange: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    contentsLoaded: selectors.getProductListContentsLoaded,
    numItems: selectors.getNumItems,
    products: selectors.getSortedListProducts,
    sort: selectors.getSort
})

const mapDispatchToProps = {
    sortChange: changeSort
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductListContents)
