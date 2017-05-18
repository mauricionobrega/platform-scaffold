import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {createPropsSelector} from 'reselect-immutable-helpers'

import Icon from 'progressive-web-sdk/dist/components/icon'
import Button from 'progressive-web-sdk/dist/components/button'
import Sheet from 'progressive-web-sdk/dist/components/sheet'

import * as messagingActions from '../../store/push-messaging/actions'
import * as messagingSelectors from '../../store/push-messaging/selectors'

/**
 * A soft-ask component to subscribe a user to web push messaging.
 */
class SoftAsk extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isShown: false,
            isDismissed: false
        }

        this.onDismiss = this.onDismiss.bind(this)
        this.onAccept = this.onAccept.bind(this)
    }

    shouldComponentUpdate(_, nextState) {
        // Only call render if we need to open or close the soft-ask UI
        return this.state.isShown !== nextState.isShown
    }

    componentWillReceiveProps(nextProps) {
        const shouldShow = this.shouldShow(nextProps)
        if (shouldShow === true) {
            console.log('[Messaging] Should show soft ask')
            this.setState({
                isShown: true
            })
        } else {
            console.info('[Messaging] Not showing soft ask, reason:', shouldShow)
        }
    }

    shouldShow(props) {
        const modulus = props.pageCount % (this.props.showOnPageCount)

        if (!props.canShowSoftAsk) {
            return 'Messaging client says we cannot show soft ask.'
        } else if (props.visitCountdown > 0) {
            return `Deferred until ${props.visitCountdown} more visit(s)`
        } else if (modulus !== 0) {
            return `Waiting for ${this.props.showOnPageCount - modulus} more page visit(s).`
        }

        return true
    }

    onDismiss() {
        console.log('[Messaging] Soft ask dismissed')
        this.setState({
            isShown: false
        })

        this.props.setVisitCountdown(this.props.sessionsToWaitIfDismissed - 1)
    }

    onAccept() {
        this.setState({
            isShown: false
        })

        this.props.subscribe().then((messagingState) => {
            console.log('[Messaging] Attempted subscription with result:', messagingState)

            // The user dismissed the system-ask - back-off from asking again
            if (!messagingState.subscribed) {
                this.props.setVisitCountdown(this.props.sessionsToWaitIfDismissed)
            }

            this.props.stateUpdate(messagingState)
        })
    }

    render() {
        const {
            className
        } = this.props

        const classes = classNames('c-messaging-soft-ask', className)

        return (
            <Sheet
                disableScrollLock
                open={this.state.isShown}
                effect="slide-bottom"
                className={classes}
                coverage="22%"
                maskOpacity={0}
                shrinkToContent
            >
                <div className="u-padding-lg">
                    <div className="u-flexbox u-margin-bottom-md">
                        <Icon name="alert" title="Subscribe to Notifications" className="u-flex-none" />
                        <p className="u-flex u-direction-column u-margin-start-md">
                            Enable push notifications to receive deals! No email address required.
                        </p>
                    </div>
                    <div className="u-text-align-end">
                        <Button className="u-text-small u-text-uppercase" onClick={this.onDismiss}>
                            No Thanks
                        </Button>
                        <Button className="c--secondary u-text-small u-text-uppercase" onClick={this.onAccept}>
                            Yes Please
                        </Button>
                    </div>
                </div>
            </Sheet>
        )
    }
}

SoftAsk.defaultProps = {
    sessionsToWaitIfDismissed: 3,
    showOnPageCount: 5
}

SoftAsk.propTypes = {
    /**
     * The current page count, for use in determining if soft-ask should be shown
     */
    pageCount: PropTypes.number.isRequired,
    /**
     * Redux action that sets how many visits to wait for until we show soft-ask again
     */
    setVisitCountdown: PropTypes.func.isRequired,
    /**
     * Redux action to update the Redux state based on an update from Messaging Client
     */
    stateUpdate: PropTypes.func.isRequired,
    /**
     * The action that will trigger the browser hard-ask dialog
     */
    subscribe: PropTypes.func.isRequired,
    /**
     * The remaining number of visits to wait for
     */
    visitCountdown: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]).isRequired,
    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,
    /**
     * When soft-ask is dismissed, wait until the given number of visits
     * (i.e. visits within a 6 hour span) before asking the user again. The
     * current visit counts as the first
     */
    sessionsToWaitIfDismissed: PropTypes.number,
    /**
     * Display the soft-ask every `showOnPageCount` visits
     */
    showOnPageCount: PropTypes.number
}

const mapStateToProps = createPropsSelector({
    pageCount: messagingSelectors.getPageCount,
    canShowSoftAsk: messagingSelectors.canShowSoftAsk,
    visitCountdown: messagingSelectors.getVisitCountdown
})

const mapDispatchToProps = {
    setVisitCountdown: messagingActions.setVisitCountdown,
    stateUpdate: messagingActions.stateUpdate,
    subscribe: messagingActions.subscribe
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SoftAsk)
