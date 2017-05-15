import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {createPropsSelector} from 'reselect-immutable-helpers'

import Icon from 'progressive-web-sdk/dist/components/icon'
import Button from 'progressive-web-sdk/dist/components/button'
import Sheet from 'progressive-web-sdk/dist/components/sheet'

import * as messagingActions from '../../store/push-messaging/actions'
import * as messagingSelectors from '../../store/push-messaging/selectors'

const DEFAULT_PAGE_VISITS = 5

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

        this.pageVisitsNeeded = this.props.showOnPageVisit || DEFAULT_PAGE_VISITS

        this.onDismiss = this.onDismiss.bind(this)
        this.onAccept = this.onAccept.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        const shouldShow = this.shouldShow(nextProps)
        if (shouldShow === true) {
            this.setState({
                isShown: true
            })
        } else {
            console.info('[Messaging] Not showing soft ask, reason:', shouldShow)
        }
    }

    shouldShow(nextProps) {
        const modulus = nextProps.pageVisitCount % (this.pageVisitsNeeded)

        if (this.state.isDismissed) {
            return 'Soft ask was dismissed'
        } else if (!nextProps.canShowSoftAsk) {
            return 'Messaging client says we cannot show soft ask.'
        } else if (modulus !== 0) {
            return `Waiting for ${this.pageVisitsNeeded - modulus} more page visit(s).`
        }

        return true
    }

    onDismiss() {
        this.setState({
            isShown: false,
            isDismissed: true
        })
    }

    onAccept() {
        this.props.subscribe()
        this.setState({
            isShown: false
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


SoftAsk.propTypes = {
    /**
     * The current page visit count, for use in determining if soft-ask should
     * be shown.
     */
    pageVisitCount: PropTypes.number.isRequired,
    /**
     * The action that will trigger the browser hard-ask dialog
     */
    subscribe: PropTypes.func.isRequired,
    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,
    /**
     * Optional setting to display the soft ask on a certain page visit count
     */
    showOnPageVisit: PropTypes.number
}

const mapStateToProps = createPropsSelector({
    pageVisitCount: messagingSelectors.getPageVisitCount,
    canShowSoftAsk: messagingSelectors.canShowSoftAsk
})

const mapDispatchToProps = {
    subscribe: messagingActions.subscribe
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SoftAsk)
