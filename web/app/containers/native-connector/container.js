import React from 'react'
import {connect} from 'react-redux'

import {onAstroEvent, disableAstroEvent} from '../../utils/astro-integration'

import {getCart} from '../../store/cart/actions'

class NativeConnector extends React.Component {
    componentDidMount() {
        onAstroEvent('cart:needs-update', () => {
            this.props.refreshCart()
        })
    }

    componentWillUnmount() {
        disableAstroEvent('cart:needs-update')
    }

    render() {
        return <span className="nativeConnector" />
    }
}

NativeConnector.propTypes = {
    refreshCart: React.PropTypes.func
}

const mapDispatchToProps = {
    refreshCart: getCart
}

export default connect(
    null,
    mapDispatchToProps
)(NativeConnector)
