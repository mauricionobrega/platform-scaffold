import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import Image from 'progressive-web-sdk/dist/components/image'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

import * as plpActions from './actions'

class Plp extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {
        this.props.fetchPlpContents()
    }

    render() {
        const {
            title,
            numItems,
            products,
            loaded
        } = this.props

        return (
            <div className="t-plp">
                <div className="heading">
                    {loaded ?
                        <h1>{title}</h1>
                    :
                        <SkeletonText type="h1" lines={1} width="100px" />
                    }

                    <Image
                        className="heading-logo"
                        src={loaded ? getAssetUrl(`static/img/${title.trim().toLowerCase()}.png`) : ''}
                        height="60px"
                        width="60px"
                    />
                </div>
                <div className="container">
                    <div className="num-results">
                        {numItems} Results
                    </div>
                    <div className="c-grid grid-container">
                        {products.map((product, idx) => {
                            if (loaded) {
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
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

Plp.propTypes = {
    fetchPlpContents: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    products: PropTypes.array.isRequired
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
