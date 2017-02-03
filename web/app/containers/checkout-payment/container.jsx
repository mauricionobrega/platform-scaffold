import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'
import throttle from 'lodash.throttle'

import * as checkoutPaymentActions from './actions'
import CheckoutPaymentReduxForm from './partials/checkout-payment-form'

import {ProgressSteps, ProgressStepsItem} from 'progressive-web-sdk/dist/components/progress-steps'

class CheckoutPayment extends React.Component {
    constructor(props) {
        super(props)

        this.handleShowCompanyAndApt = this.handleShowCompanyAndApt.bind(this)
        this.handleScroll = throttle(this.handleScroll.bind(this), 200)
    }

    componentDidMount() {
        // this.props.fetchContents()
        window.addEventListener('scroll', this.handleScroll.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this))
    }

    shouldComponentUpdate(newProps) {
        const checkoutPaymentChanged = !Immutable.is(this.props.checkoutPayment, newProps.checkoutPayment)
        const miniCartChanged = !Immutable.is(this.props.miniCart, newProps.miniCart)
        return checkoutPaymentChanged || miniCartChanged
    }

    handleScroll() {
        const {isFixedPlaceOrderShown} = this.props.checkoutPayment.toJS()
        const footerHeight = 200
        const scrollPosition = window.pageYOffset
        const windowSize = window.innerHeight
        const bodyHeight = document.body.offsetHeight
        const distanceFromBottom = Math.max(bodyHeight - (scrollPosition + windowSize), 0)
        const newIsFixedPlaceOrderShown = distanceFromBottom > footerHeight

        if (newIsFixedPlaceOrderShown !== isFixedPlaceOrderShown) {  // Saves triggering the action
            this.props.toggleFixedPlaceOrder(newIsFixedPlaceOrderShown)
        }
    }

    handleShowCompanyAndApt() {
        this.props.showCompanyAndApt()
    }

    render() {
        const cart = this.props.miniCart.get('cart').toJS()
        const {
            contentsLoaded,
            isCompanyOrAptShown,
            isFixedPlaceOrderShown,
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
                    isFixedPlaceOrderShown={isFixedPlaceOrderShown}
                    handleShowCompanyAndApt={this.handleShowCompanyAndApt}
                />
            </div>
        )
    }
}

CheckoutPayment.propTypes = {
    checkoutPayment: PropTypes.instanceOf(Immutable.Map),
    fetchContents: PropTypes.func,
    isFixedPlaceOrderShown: PropTypes.bool,
    miniCart: PropTypes.object,
    showCompanyAndApt: PropTypes.func,
    toggleFixedPlaceOrder: PropTypes.func,
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
    toggleFixedPlaceOrder: checkoutPaymentActions.toggleFixedPlaceOrder,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckoutPayment)
