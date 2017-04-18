import React from 'react'
import {connect} from 'react-redux'

import {onAstroEvent, disableAstroEvent} from '../../utils/astro-integration'

import {getCart} from '../../integration-manager/cart/commands'

const needsUpdateEvent = 'cart:needs-update'

class NativeConnector extends React.Component {
    componentDidMount() {
        onAstroEvent(needsUpdateEvent, () => {
            this.props.refreshCart()
        })
    }

    componentWillUnmount() {
        disableAstroEvent(needsUpdateEvent)
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
