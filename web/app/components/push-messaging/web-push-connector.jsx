import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import * as messagingActions from '../../store/push-messaging/actions'

class WebPushConnector extends React.Component {
    constructor(props) {
        super(props)

        this.handleStateUpdate = this.handleStateUpdate.bind(this)
    }

    componentDidMount() {
        console.info('[Messaging] Init start')
        window.Progressive.MessagingClientInitPromise
            .then(() => window.Progressive.MessagingClient.register(this.handleStateUpdate))
            .then((state) => this.props.stateUpdate(state))
            .then(() => console.info('[Messaging] Init finish'))
    }

    handleStateUpdate(event) {
        console.info('[Messaging] state update', event.detail)
        this.props.stateUpdate(event.detail)
    }

    shouldComponentUpdate() {
        // We don't render any UI - so don't update
        return false
    }

    render() {
        return null
    }
}


WebPushConnector.propTypes = {
    /**
     * Dispatches an action to update Redux representation of Messaging state:
     * - {boolean} subscribed - whether the user is subscribed to Messaging
     * - {boolean} canSubscribe - whether it's possible to ask the user to subscribe
     * - {array} channels - array of subscribed channels
     */
    stateUpdate: PropTypes.func.isRequired

}

const mapDispatchToProps = {
    stateUpdate: messagingActions.stateUpdate
}

export default connect(
    null,
    mapDispatchToProps
)(WebPushConnector)
