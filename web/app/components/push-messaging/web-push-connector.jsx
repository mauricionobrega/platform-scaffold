import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import * as messagingActions from '../../store/push-messaging/actions'

/**
 * Non-UI component to register with the Messaging Client for state updates, as
 * well as handle the rehydration of the Redux store of persisted values important
 * to the Push Messaging components.
 */
class WebPushConnector extends React.Component {
    constructor(props) {
        super(props)

        this.handleStateUpdate = this.handleStateUpdate.bind(this)
    }

    componentWillMount() {
        this.props.rehydrateVisitCountdown()
        this.props.rehydratePageCount()
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
     * Rehydrates the Redux store with the persisted page count in local storage,
     * if present
     */
    rehydratePageCount: PropTypes.func.isRequired,
    /**
     * Rehydrates the Redux store with the persisted visit countdown in local
     * storage, if present
     */
    rehydrateVisitCountdown: PropTypes.func.isRequired,
    /**
     * Dispatches an action to update Redux representation of Messaging state:
     * - {boolean} subscribed - whether the user is subscribed to Messaging
     * - {boolean} canSubscribe - whether it's possible to ask the user to subscribe
     * - {array} channels - array of subscribed channels
     */
    stateUpdate: PropTypes.func.isRequired

}

const mapDispatchToProps = {
    stateUpdate: messagingActions.stateUpdate,
    rehydratePageCount: messagingActions.rehydratePageCount,
    rehydrateVisitCountdown: messagingActions.rehydrateVisitCountdown
}

export default connect(
    null,
    mapDispatchToProps
)(WebPushConnector)
