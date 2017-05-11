import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

import * as messagingActions from '../../store/push-messaging/actions'
import * as appSelectors from '../../containers/app/selectors'

class WebPushConnector extends React.Component {
    constructor(props) {
        super(props)

        this.handleStateUpdate = this.handleStateUpdate.bind(this)
    }

    componentDidMount() {
        const promise = window.Progressive.MessagingClientInitPromise

        console.info('[Messaging] begin init')
        promise && promise
            .then(() => window.Progressive.MessagingClient.register(this.handleStateUpdate))
            .then((state) => this.props.stateUpdate(state))
            .then(() => console.info('[Messaging] init complete'))
    }

    handleStateUpdate(event) {
        console.info('[Messaging] state update', event.detail)
        this.props.stateUpdate(event.detail)
    }

    shouldComponentUpdate() {
        // We don't render any UI - so don't update
        return false
    }

    componentWillReceiveProps() {
        // TODO - Page visit persistence?
    }

    render() {
        return <noscript />
    }
}


WebPushConnector.propTypes = {
    /**
     * The current page visit count, for use in determining if soft-ask should
     * be shown.
     */
    pageVisitCount: PropTypes.number.isRequired,
    /**
     * Dispatches an action to update Redux representation of Messaging state:
     * - {boolean} subscribed - whether the user is subscribed to Messaging
     * - {boolean} canSubscribe - whether it's possible to ask the user to subscribe
     * - {array} channels - array of subscribed channels
     */
    stateUpdate: PropTypes.func.isRequired

}

const mapStateToProps = createPropsSelector({
    pageVisitCount: appSelectors.getPageVisitCount
})

const mapDispatchToProps = {
    stateUpdate: messagingActions.stateUpdate
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WebPushConnector)
