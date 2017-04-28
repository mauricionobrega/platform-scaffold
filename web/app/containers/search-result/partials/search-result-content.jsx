import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getHasProducts, getFilteredAndSortedSearchResultListProducts, getSort} from '../selectors'

import {changeSort} from '../../../store/search-result/actions'

import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import List from 'progressive-web-sdk/dist/components/list'
import Button from 'progressive-web-sdk/dist/components/button'
import Icon from 'progressive-web-sdk/dist/components/icon'
import Image from 'progressive-web-sdk/dist/components/image'
import ProductTile from '../../../components/product-tile'

const ResultList = ({products}) => {
    console.log('products', products)
    return (
        <List className="c--borderless">
            {products.map((product, idx) => (<ProductTile key={idx} {...product} />))}
        </List>
    )
}

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

        <div className="t-search-result__no-results-text u-text-align-center">
            your search returned no results. Please check your spelling and try searching again.
        </div>
    </div>
)

NoResultsList.propTypes = {
    bodyText: PropTypes.string
}

const SearchResultContent = ({
    hasProducts,
    products,
    sortChange
}) => (
    <div className="t-search-result__container u-padding-end u-padding-bottom-lg u-padding-top-lg u-padding-start">
        {hasProducts ?
            <div>
                <div className="u-padding-bottom-md u-padding-start-sm u-padding-end-sm">
                    <div className="u-flexbox">
                        <div className="u-flex u-margin-end-md">
                            <div className="u-text-semi-bold u-margin-bottom-sm">
                                {products.length} Items
                            </div>
                            <Button disabled
                                className="c--tertiary u-width-full u-text-uppercase"
                            >
                                Filter
                            </Button>
                        </div>
                        <div className="t-search-result__sort u-flex">
                            <label htmlFor="sort" className="u-text-semi-bold u-margin-bottom-sm">
                                Sort by
                            </label>

                            <div>
                                <div className="u-position-relative u-width-full">
                                    <select
                                        className="t-search-result__sort-select"
                                        onChange={(e) => { sortChange(e.target.value) }}
                                        onBlur={(e) => { sortChange(e.target.value) }}
                                    >
                                        <option value="name">Name</option>
                                        <option value="price">Price</option>
                                        <option value="relevance">Relevance</option>
                                    </select>

                                    <div className="t-search-result__sort-icon">
                                        <Icon name="caret-down" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ResultList products={products} />
            </div>
        :
            <NoResultsList />
        }
    </div>
)

SearchResultContent.propTypes = {
    hasProducts: PropTypes.bool,
    products: PropTypes.array,
    sortChange: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    hasProducts: getHasProducts,
    products: getFilteredAndSortedSearchResultListProducts,
    sort: getSort
})

const mapDispatchToProps = {
    sortChange: changeSort
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultContent)
