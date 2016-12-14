import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'

import * as checkoutPaymentActions from './actions'
import CheckoutPaymentReduxForm from './partials/checkout-payment-form'
import {ProgressSteps, ProgressStepsItem} from 'progressive-web-sdk/dist/components/progress-steps'

class CheckoutPayment extends React.Component {
    componentDidMount() {
        // this.props.fetchContents()
    }

    shouldComponentUpdate(newProps) {
        return !Immutable.is(this.props.checkoutPayment, newProps.checkoutPayment)
    }

    render() {
        const {
            contentsLoaded
        } = this.props.checkoutPayment.toJS()

        return contentsLoaded && (
            <div className="t-checkout-payment u-bg-color-neutral-20">
                <div className="u-bg-color-neutral-10 u-border-light-bottom">
                    <ProgressSteps className="u-center-piece">
                        <ProgressStepsItem icon="cart" title="Cart" href="#" />
                        <ProgressStepsItem icon="star" title="Shipping" />
                        <ProgressStepsItem icon="star" title="Payment" current />
                        <ProgressStepsItem icon="check" title="Done" />
                    </ProgressSteps>
                </div>

                <CheckoutPaymentReduxForm />
            </div>
        )
    }
}

CheckoutPayment.propTypes = {
    checkoutPayment: PropTypes.instanceOf(Immutable.Map),
    fetchContents: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        checkoutPayment: state.checkoutPayment
    }
}

const mapDispatchToProps = {
    fetchContents: checkoutPaymentActions.fetchContents
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckoutPayment)
