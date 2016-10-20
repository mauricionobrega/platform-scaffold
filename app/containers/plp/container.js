import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import Image from 'progressive-web-sdk/dist/components/image'
import Link from 'progressive-web-sdk/dist/components/link'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

import * as plpActions from './actions'

class Plp extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.renderResults = this.renderResults.bind(this)
        this.renderNoResults = this.renderNoResults.bind(this)
    }

    componentDidMount() {
        this.props.fetchPlpContents()
    }

    renderResults() {
        return this.props.products.map((product, idx) => {
            if (this.props.loaded) {
                const {name, href, image: {src, alt}, price} = product

                return (
                    <ListTile
                        className="c-grid__item"
                        href={href}
                        key={idx}
                        startAction={<Image src={src} alt={alt} height="160px" width="128px" />}
                    >
                        <div className="c-grid__item-name">{name}</div>
                        <div className="c-grid__item-price">{price}</div>
                    </ListTile>
                )
            } else {
                return (
                    <ListTile
                        className="c-grid__item"
                        key={idx}
                        startAction={<SkeletonBlock className="c--skeleton" height="160px" width="128px" />}
                    >
                        <SkeletonText lines={2} className="c--skeleton-text" />
                    </ListTile>
                )
            }
        })
    }

    renderNoResults() {
        return (
            <div>
                <Image src={getAssetUrl('static/img/no-results.png')} className="no-results__image" />
                <div className="no-results__text">
                    {this.props.noResultsText}
                </div>
            </div>
        )
    }

    render() {
        const {
            title,
            numItems,
            products,
            loaded
        } = this.props

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
                        <SkeletonText type="h1" lines={1} width="100px" />
                    }

                    <Image
                        className="heading-logo"
                        src={loaded ? getAssetUrl(`static/img/${title.trim().toLowerCase()}.png`) : ''}
                        height="51px"
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
                        {hasResults ? this.renderResults() : this.renderNoResults()}
                    </div>
                </div>
            </div>
        )
    }
}

Plp.propTypes = {
    fetchPlpContents: PropTypes.func.isRequired,
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

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPlpContents: () => dispatch(plpActions.fetchPlpContents())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Plp)
