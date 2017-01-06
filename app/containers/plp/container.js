import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

import Image from 'progressive-web-sdk/dist/components/image'
import Link from 'progressive-web-sdk/dist/components/link'
import List from 'progressive-web-sdk/dist/components/list'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import ProductTile from './partials/product-tile'
import {isOffline} from '../app/reducer'
import {getRoutedState} from '../../utils/router-utils'

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
                src={getAssetUrl('static/img/no-results.png')} />

            <div className="t-plp__no-results-text u-text-align-center">
                {bodyText}
            </div>
        </div>
    )
}

class PLP extends React.Component {
    shouldComponentUpdate(nextProps) {
        return !Immutable.is(this.props.routedState, nextProps.routedState) || (this.props.isOffline !== nextProps.isOffline)
    }

    render() {
        const {
            hasProducts,
            isPlaceholder,
            noResultsText,
            numItems,
            products,
            title
        } = this.props

        return (
            <div className="t-plp">
                <div className="u-flexbox u-align-bottom">
                    <div className="u-flex u-padding-top-lg u-padding-bottom-lg u-padding-start-md">
                        <div className="t-plp__breadcrumb">
                            <Link href="/" className="u-text-small">Home</Link>
                        </div>

                        <div className="u-margin-top-md">
                            {isPlaceholder ?
                                <SkeletonText lines={1} type="h1" width="100px" />
                            :
                                <h1 className="u-text-lighter u-text-uppercase">{title}</h1>
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
                        {isPlaceholder ?
                            <SkeletonBlock height="20px" />
                        :
                            <span className="u-text-semi-bold">{numItems} Results</span>
                        }
                    </div>

                    <List className="c--borderless">
                        {hasProducts ? renderResults(products) : renderNoResults(noResultsText)}
                    </List>
                </div>
            </div>
        )
    }
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
     * The Immutable.js state object, for use with shouldComponentUpdate
     */
    routedState: PropTypes.object.isRequired,
    /**
     * The PLP title (i.e. Potions, Ingredients, etc.)
     */
    title: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
    const routedState = getRoutedState(state.plp)
    return {
        isOffline: isOffline(state),
        routedState,
        ...routedState.toJS()
    }
}

export default connect(
    mapStateToProps
)(PLP)
