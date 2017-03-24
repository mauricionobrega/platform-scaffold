import React from 'react'
import {connect} from 'react-redux'

import {onAstroEvent, disableAstroEvent} from '../../utils/astro-integration'

import {getCart} from '../../store/cart/actions'

class NativeConnector extends React.Component {
    componentDidMount() {
        console.log('Mounting native component, listening to cart:needs-update')
        onAstroEvent('cart:needs-update', () => {
            console.log('cart:needs-update in NativeConnector')
            this.props.refreshCart()
        })
    }

    componentWillUnmount() {
        console.log('Removing Astro event for cart:needs-update')
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
