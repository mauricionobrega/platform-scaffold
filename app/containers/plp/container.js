import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

import Image from 'progressive-web-sdk/dist/components/image'
import Link from 'progressive-web-sdk/dist/components/link'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'
import ProductTile from '../../components/product-tile'

const renderResults = (products) => {
    return products.map((product, idx) => <ProductTile className="c-grid__item" key={idx} product={product} />)
}

const renderNoResults = (bodyText) => {
    return (
        <div>
            <Image alt="No results" className="no-results__image" src={getAssetUrl('static/img/no-results.png')} />
            <div className="no-results__text">
                {bodyText}
            </div>
        </div>
    )
}

const PLP = ({loaded, noResultsText, numItems, products, title}) => {
    const hasResults = products.length > 0

    return (
        <div className="t-plp">
            <div className="heading">
                <div>
                    <Link href="/" text="Home" />
                </div>
                {loaded ?
                    <h1>{title}</h1>
                :
                    <SkeletonText lines={1} type="h1" width="100px" />
                }

                <Image
                    alt="Heading logo"
                    className="heading-logo"
                    height="51px"
                    src={loaded ? getAssetUrl(`static/img/${title.trim().toLowerCase()}.png`) : ''}
                    width="61px"
                />
            </div>
            <div className="container">
                {loaded ?
                    <div className="num-results">
                        {numItems} Results
                    </div>
                :
                    <SkeletonText lines={1} width="85px" />
                }
                <div className="c-grid grid-container">
                    {hasResults ? renderResults(products) : renderNoResults(noResultsText)}
                </div>
            </div>
        </div>
    )
}

PLP.propTypes = {
    loaded: PropTypes.bool.isRequired,
    noResultsText: PropTypes.string.isRequired,
    numItems: PropTypes.string.isRequired,
    products: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
    return {
        ...state.plp.toJS()
    }
}

export default connect(
    mapStateToProps
)(PLP)
