import React from 'react'

import template from '../../template'

import CheckoutConfirmationSplash from './partials/checkout-confirmation-splash'
import CheckoutConfirmationDetails from './partials/checkout-confirmation-details'
import CheckoutConfirmationModal from './partials/checkout-confirmation-modal'
import CheckoutConfirmationQuestions from './partials/checkout-confirmation-questions'

import {fetchCheckoutConfirmationData} from '../../integration-manager/checkout/commands'

import {trigger} from '../../utils/astro-integration'

class CheckoutConfirmation extends React.Component {
    componentDidMount() {
        trigger('checkout:completed')
    }

    render() {
        return (
            <div className="t-checkout-confirmation">
                <CheckoutConfirmationSplash />
                <CheckoutConfirmationDetails />
                <CheckoutConfirmationQuestions />
                <CheckoutConfirmationModal />
            </div>
        )
    }
}

CheckoutConfirmation.fetcher = (url, routeName, dispatch) => dispatch(fetchCheckoutConfirmationData(url, routeName))

export default template(CheckoutConfirmation)
