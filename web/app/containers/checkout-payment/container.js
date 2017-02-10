import React from 'react'

// Partials
import CheckoutPaymentReduxForm from './partials/checkout-payment-form'

// SDK Components
import {ProgressSteps, ProgressStepsItem} from 'progressive-web-sdk/dist/components/progress-steps'

const CheckoutPayment = () => {
    return (
        <div className="t-checkout-payment">
            <div className="u-bg-color-neutral-00 u-border-light-bottom">
                <div className="t-checkout-payment__progress">
                    <ProgressSteps>
                        <ProgressStepsItem icon="cart-full" title="Cart" href="/checkout/cart/" />
                        <ProgressStepsItem icon="shipping" title="Shipping" href="/checkout/shipping/" />
                        <ProgressStepsItem icon="payment-full" title="Payment" current />
                        <ProgressStepsItem icon="done" title="Done" />
                    </ProgressSteps>
                </div>
            </div>

            <CheckoutPaymentReduxForm />
        </div>
    )
}

export default CheckoutPayment
