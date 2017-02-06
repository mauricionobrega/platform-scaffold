import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'
import classNames from 'classnames'

import * as checkoutShippingActions from './actions'
import CheckoutShippingReduxForm from './partials/checkout-shipping-form'
import {ProgressSteps, ProgressStepsItem} from 'progressive-web-sdk/dist/components/progress-steps'


class CheckoutShipping extends React.Component {
    constructor(props) {
        super(props)

        this.handleShowCompanyAndApt = this.handleShowCompanyAndApt.bind(this)
    }

    componentDidMount() {
        // this.props.fetchContents()
    }

    shouldComponentUpdate(newProps) {
        return !Immutable.is(this.props.checkoutShipping, newProps.checkoutShipping)
    }

    handleShowCompanyAndApt() {
        this.props.showCompanyAndApt()
    }

    render() {
        const {
            contentsLoaded,
            isCompanyOrAptShown,
            formTitle
        } = this.props.checkoutShipping.toJS()
        const {onShippingEmailRecognized} = this.props

        const templateClassnames = classNames('t-checkout-shipping u-bg-color-neutral-20', {
            't--loaded': contentsLoaded
        })

        return (
            <div className={templateClassnames}>
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

                <CheckoutShippingReduxForm
                    formTitle={formTitle}
                    isCompanyOrAptShown={isCompanyOrAptShown}
                    handleShowCompanyAndApt={this.handleShowCompanyAndApt}
                    onShippingEmailRecognized={onShippingEmailRecognized}
                />
            </div>
        )
    }
}

CheckoutShipping.propTypes = {
    checkoutShipping: PropTypes.instanceOf(Immutable.Map),
    fetchContents: PropTypes.func,
    showCompanyAndApt: PropTypes.func,

    onShippingEmailRecognized: PropTypes.func,
}

const mapStateToProps = (state) => {
    return {
        checkoutShipping: state.ui.checkoutShipping
    }
}

const mapDispatchToProps = {
    fetchContents: checkoutShippingActions.fetchContents,
    showCompanyAndApt: checkoutShippingActions.showCompanyAndApt,
    onShippingEmailRecognized: checkoutShippingActions.onShippingEmailRecognized,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckoutShipping)
