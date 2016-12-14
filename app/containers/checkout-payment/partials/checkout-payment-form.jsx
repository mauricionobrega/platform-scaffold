import React from 'react'
import * as ReduxForm from 'redux-form'

import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import {Grid, GridSpan} from '../../../components/grid'
import {Icon} from 'progressive-web-sdk/dist/components/icon'

const renderCreditCartForm = () => {
    const cvvHint = (
        <Button innerClassName="u-color-brand">
            <Icon name="question" />
            <span className="u-visually-hidden">What is the CVV&#63;</span>
        </Button>
    )

    return (
        <div>
            <div className="t-checkout-payment__title u-padding-top-lg u-padding-bottom-lg">
                <h2 className="u-h4">Pay With Card</h2>
            </div>

            <div className="u-padding-md u-border-light-top u-border-light-bottom u-bg-color-neutral-10">
                <FieldRow>
                    <ReduxForm.Field component={Field} name="email" label="Cardholder Name">
                        <input type="text" noValidate />
                    </ReduxForm.Field>
                </FieldRow>

                <FieldRow>
                    <ReduxForm.Field component={Field} name="email" label="Card number">
                        <input type="tel" noValidate />
                    </ReduxForm.Field>
                </FieldRow>

                <FieldRow>
                    <ReduxForm.Field component={Field} name="email" label="Expiry" placeholder="mm/yyyy">
                        <input type="number" noValidate />
                    </ReduxForm.Field>

                    <ReduxForm.Field component={Field} name="email" label="CVV" hint={cvvHint}>
                        <input type="tel" noValidate />
                    </ReduxForm.Field>
                </FieldRow>
            </div>
        </div>
    )
}

const renderBillingAddress = () => {
    const shippingAddress = (
        <div>
            <p>720 W Georgia, Vancouver, V4R5TS</p>
            <p>Name: John Appleseed</p>
        </div>
    )

    const addDetails = (
        <Button className="c--is-anchor" innerClassName="u-padding-0">
            <span className="u-color-brand u-text-letter-spacing-normal u-text-small">
                Add company, apt #, suite etc.
                <Icon name="chevron-down" />
            </span>
        </Button>
    )

    const newShippingAddressIsEnabled = true

    return (
        <div>
            <div className="t-checkout-payment__title u-padding-top-lg u-padding-bottom-lg">
                <h2 className="u-h4">Billing Address</h2>
            </div>

            <div className="u-border-light-top u-border-light-bottom u-bg-color-neutral-10">
                <FieldRow className="u-padding-md">
                    <ReduxForm.Field component={Field} name="email" label="Same as shipping address" caption={shippingAddress}>
                        <input type="checkbox" noValidate checked />
                    </ReduxForm.Field>
                </FieldRow>

                {newShippingAddressIsEnabled &&
                    <div className="u-padding-md u-border-light-top">
                        <FieldRow>
                            <ReduxForm.Field component={Field} name="email" label="Full name">
                                <input type="text" noValidate />
                            </ReduxForm.Field>
                        </FieldRow>

                        <FieldRow>
                            <ReduxForm.Field component={Field} name="email" label="Address" caption={addDetails}>
                                <input type="text" noValidate />
                            </ReduxForm.Field>
                        </FieldRow>

                        <FieldRow>
                            <ReduxForm.Field component={Field} name="email" label="City">
                                <input type="text" noValidate />
                            </ReduxForm.Field>
                        </FieldRow>

                        <FieldRow>
                            <ReduxForm.Field component={Field} name="email" label="State/Province">
                                <select>
                                    <option>Select option</option>
                                </select>
                            </ReduxForm.Field>
                        </FieldRow>

                        <FieldRow>
                            <ReduxForm.Field component={Field} name="email" label="Zip/Postal code">
                                <input type="text" noValidate />
                            </ReduxForm.Field>
                        </FieldRow>

                        <FieldRow>
                            <ReduxForm.Field component={Field} name="email" label="Country">
                                <select>
                                    <option>United States</option>
                                </select>
                            </ReduxForm.Field>
                        </FieldRow>
                    </div>
                }
            </div>
        </div>
    )
}

const renderOrderSummary = () => {
    return (
        <div>
            <div className="t-checkout-payment__title u-padding-top-lg u-padding-bottom-lg">
                <h2 className="u-h4">Order Summary</h2>
            </div>

            <div className="u-padding-md u-border-light-top u-border-light-bottom u-bg-color-neutral-10">
                <p>Insert list of products here</p>
                <p>Insert summary table</p>
                <p>Insert discount code</p>
                <p>Insert total price</p>
                <p>Insert Place order button</p>
                <p>Insert Verisign and McAfee notices</p>
            </div>
        </div>
    )
}

const CheckoutPaymentForm = (props) => {
    const {
        handleSubmit,
        // disabled,
        // submitting
    } = props

    return (
        <form onSubmit={handleSubmit} noValidate>
            <Grid className="u-center-piece">
                <GridSpan tablet={{span: 6, pre: 1, post: 1}} desktop={{span: 7}}>
                    {renderCreditCartForm()}
                    {renderBillingAddress()}
                </GridSpan>

                <GridSpan tablet={{span: 6, pre: 1, post: 1}} desktop={{span: 5}}>
                    {renderOrderSummary()}
                </GridSpan>
            </Grid>
        </form>
    )
}

CheckoutPaymentForm.propTypes = {
    /**
     * Whether the form is disabled or not
     */
    disabled: React.PropTypes.bool,

    /**
     * Redux-form internal
     */
    handleSubmit: React.PropTypes.func,

    /**
     * Redux-form internal
     */
    submitting: React.PropTypes.bool
}

const validate = (values) => {
    const errors = {}
    if (values.email && !values.email.match('@')) {  // Obviously not for real
        errors.email = 'Enter a valid email address'
    }
    return errors
}

const CheckoutPaymentReduxForm = ReduxForm.reduxForm({
    form: 'paymentForm',
    validate,
})(CheckoutPaymentForm)

export default CheckoutPaymentReduxForm
