import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'

import * as checkoutPaymentActions from './actions'
import CheckoutPaymentReduxForm from './partials/checkout-payment-form'

import {ProgressSteps, ProgressStepsItem} from 'progressive-web-sdk/dist/components/progress-steps'

class CheckoutPayment extends React.Component {
    constructor(props) {
        super(props)

        this.handleShowCompanyAndApt = this.handleShowCompanyAndApt.bind(this)
    }

    componentDidMount() {
        // this.props.fetchContents()
    }

    shouldComponentUpdate(newProps) {
        const checkoutPaymentChanged = !Immutable.is(this.props.checkoutPayment, newProps.checkoutPayment)
        const miniCartChanged = !Immutable.is(this.props.miniCart, newProps.miniCart)
        return checkoutPaymentChanged || miniCartChanged
    }

    handleShowCompanyAndApt() {
        this.props.showCompanyAndApt()
    }

    render() {
        const cart = this.props.miniCart.get('cart').toJS()
        const {
            contentsLoaded,
            isCompanyOrAptShown
        } = this.props.checkoutPayment.toJS()

        return contentsLoaded && (
            <div className="t-checkout-payment u-bg-color-neutral-20">
                <div className="u-bg-color-neutral-10 u-border-light-bottom">
                    <div className="t-checkout-payment__progress">
                        <ProgressSteps>
                            <ProgressStepsItem icon="cart-full" title="Cart" href="/checkout/cart/" />
                            <ProgressStepsItem icon="shipping" title="Shipping" href="/checkout/shipping/" />
                            <ProgressStepsItem icon="payment-full" title="Payment" current />
                            <ProgressStepsItem icon="done" title="Done" />
                        </ProgressSteps>
                    </div>
                </div>

                <CheckoutPaymentReduxForm
                    cart={cart}
                    isCompanyOrAptShown={isCompanyOrAptShown}
                    handleShowCompanyAndApt={this.handleShowCompanyAndApt}
                />
            </div>
        )
    }
}

CheckoutPayment.propTypes = {
    checkoutPayment: PropTypes.instanceOf(Immutable.Map),
    fetchContents: PropTypes.func,
    miniCart: PropTypes.object,
    showCompanyAndApt: PropTypes.func,
}

const mapStateToProps = (state) => {
    return {
        checkoutPayment: state.checkoutPayment,
        miniCart: state.miniCart
    }
}

const mapDispatchToProps = {
    fetchContents: checkoutPaymentActions.fetchContents,
    showCompanyAndApt: checkoutPaymentActions.showCompanyAndApt,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckoutPayment)
