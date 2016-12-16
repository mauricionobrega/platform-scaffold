import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'

import * as checkoutShippingActions from './actions'
import CheckoutShippingReduxForm from './partials/checkout-shipping-form'
import {ProgressSteps, ProgressStepsItem} from 'progressive-web-sdk/dist/components/progress-steps'


class CheckoutShipping extends React.Component {
    componentDidMount() {
        // this.props.fetchContents()
    }

    shouldComponentUpdate(newProps) {
        return !Immutable.is(this.props.checkoutShipping, newProps.checkoutShipping)
    }

    render() {
        const {
            contentsLoaded,
        } = this.props.checkoutShipping.toJS()

        return contentsLoaded && (
            <div className="t-checkout-shipping u-bg-color-neutral-20">
                <div className="u-bg-color-neutral-10 u-border-light-bottom">
                    <div className="t-checkout-shipping__progress">
                        <ProgressSteps>
                            <ProgressStepsItem icon="cart-full" title="Cart" href="#" />
                            <ProgressStepsItem icon="shipping" title="Shipping" current />
                            <ProgressStepsItem icon="payment-full" title="Payment" />
                            <ProgressStepsItem icon="done" title="Done" />
                        </ProgressSteps>
                    </div>
                </div>

                <CheckoutShippingReduxForm />
            </div>
        )
    }
}

CheckoutShipping.propTypes = {
    checkoutShipping: PropTypes.instanceOf(Immutable.Map),
    fetchContents: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        checkoutShipping: state.checkoutShipping
    }
}

const mapDispatchToProps = {
    fetchContents: checkoutShippingActions.fetchContents
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckoutShipping)
