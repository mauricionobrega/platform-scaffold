import React from 'react'

import CheckoutConfirmationSplash from './partials/checkout-confirmation-splash'
import CheckoutConfirmationDetails from './partials/checkout-confirmation-details'
import CheckoutConfirmationModal from './partials/checkout-confirmation-modal'
import CheckoutConfirmationQuestions from './partials/checkout-confirmation-questions'

const CheckoutConfirmation = () => (
    <div className="t-checkout-confirmation u-bg-color-neutral-20">
        <CheckoutConfirmationSplash />
        <CheckoutConfirmationDetails />
        <CheckoutConfirmationQuestions />
        <CheckoutConfirmationModal />
    </div>
)

export default CheckoutConfirmation
