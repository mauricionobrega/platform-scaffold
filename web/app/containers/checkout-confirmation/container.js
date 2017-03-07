import React from 'react'

import CheckoutConfirmationSplash from './partials/checkout-confirmation-splash'
import CheckoutConfirmationDetails from './partials/checkout-confirmation-details'
import CheckoutConfirmationModal from './partials/checkout-confirmation-modal'
import CheckoutConfirmationQuestions from './partials/checkout-confirmation-questions'
import {continueShopping} from './actions'

import {trigger} from '../../utils/astro-integration'

class CheckoutConfirmation extends React.Component {
    componentDidMount() {
        trigger('checkout:disable-alert')
        trigger('cart-updated', {
            count: 0
        })
    }

    render() {
        return (
            <div className="t-checkout-confirmation">
                <CheckoutConfirmationSplash />
                <CheckoutConfirmationDetails />
                <CheckoutConfirmationQuestions onContinueShopping={continueShopping} />
                <CheckoutConfirmationModal />
            </div>
        )
    }
}

export default CheckoutConfirmation
