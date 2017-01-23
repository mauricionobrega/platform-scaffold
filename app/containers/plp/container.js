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
import Offline from '../../components/offline'

import {isOffline} from '../app/reducer'
import {fetchPage} from '../app/actions'
import {getComponentType} from '../../utils/utils'
import {getSelectorFromState} from '../../utils/router-utils'

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

class PLP extends React.Component {
    shouldComponentUpdate(nextProps) {
        return !Immutable.is(this.props.plp, nextProps.plp) ||
            !Immutable.is(nextProps.products, this.props.products) ||
            (this.props.isOffline !== nextProps.isOffline)
    }

    render() {
        const {
            isOffline,
            route,
            fetchPage
        } = this.props

        const {
            hasProducts,
            contentsLoaded,
            noResultsText,
            numItems,
            title
        } = this.props.plp.toJS()

        const products = this.props.products

        if (isOffline && !contentsLoaded) {
            const reload = () => fetchPage(window.location.href, getComponentType(route.component), route.routeName)
            return <Offline retry={reload} />
        }

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
}

PLP.propTypes = {
    /**
     * Fires a fetchPage action.
     */
    fetchPage: PropTypes.func.isRequired,
    /**
     * Whether the device is thought to be offline
     */
    isOffline: PropTypes.bool.isRequired,
    /**
     * The Immutable.js PLP state object
     */
    plp: PropTypes.object.isRequired,
    /**
     * Product data from state (Catalog -> Products), filtered by the productUrls in the Plp state object
     */
    products: PropTypes.array.isRequired,
    /**
     * The route object from react-router
     */
    route: PropTypes.object.isRequired
}

const mapStateToProps = ({app, catalog, plp}) => {
    const selector = getSelectorFromState(plp)
    const routedPlp = plp.get(selector)
    const productUrls = routedPlp.get('productUrls').toJS()
    const catalogProducts = catalog.products
    const products = productUrls.map((url) => {
        return catalogProducts.get(url).toJS()
    })
    return {
        isOffline: isOffline({app}),
        products,
        plp: routedPlp
    }
}

const mapDispatchToProps = {fetchPage}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PLP)
