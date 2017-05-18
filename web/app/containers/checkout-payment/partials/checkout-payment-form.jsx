/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import * as ReduxForm from 'redux-form'
import {createPropsSelector} from 'reselect-immutable-helpers'

// Selectors
import {PAYMENT_FORM_NAME} from '../../../store/form/constants'
import {getBillingInitialValues} from '../../../store/checkout/billing/selectors'

// Actions
import {submitPayment} from '../actions'

// SDK Component
import {Grid, GridSpan} from 'progressive-web-sdk/dist/components/grid'

// Partials
import CreditCardForm from './credit-card-form'
import BillingAddressForm from './billing-address-form'
import OrderSummary from './order-summary'

const CheckoutPaymentForm = ({handleSubmit, submitPayment}) => {
    return (
        <Grid className="u-center-piece">
            <GridSpan tablet={{span: 6, pre: 1, post: 1}} desktop={{span: 7}}>
                <form className="t-checkout-payment__form" onSubmit={handleSubmit(submitPayment)} noValidate>
                    <CreditCardForm />
                    <BillingAddressForm />
                </form>
            </GridSpan>
            <GridSpan tablet={{span: 6, pre: 1, post: 1}} desktop={{span: 5}}>
                <OrderSummary />
            </GridSpan>
        </Grid>
    )
}

CheckoutPaymentForm.propTypes = {
    /**
     * Redux-form internal
     */
    handleSubmit: PropTypes.func,
    /**
    * Submits the payment form information to the server
    */
    submitPayment: PropTypes.func,
    /**
     * Redux-form internal
     */
    submitting: PropTypes.bool
}

const mapStateToProps = createPropsSelector({
    initialValues: getBillingInitialValues
})

const mapDispatchToProps = {
    submitPayment
}

const CheckoutPaymentReduxForm = ReduxForm.reduxForm({
    form: PAYMENT_FORM_NAME
})(CheckoutPaymentForm)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckoutPaymentReduxForm)
