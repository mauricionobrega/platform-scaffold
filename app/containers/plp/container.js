import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import Image from 'progressive-web-sdk/dist/components/image'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'

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
            products
        } = this.props

        return (
            <div className="t-plp">
                <h1>{title}</h1>
                <div className="">
                    {products.map(({name, href, image: {src, alt}, price}, key) => {
                        return (
                            <ListTile href={href} key={key}>
                                <Image src={src} alt={alt} />
                                <div>{name}</div>
                                <div>{price}</div>
                            </ListTile>
                        )
                    })}
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
