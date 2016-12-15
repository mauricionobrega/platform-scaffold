import React from 'react'
import * as ReduxForm from 'redux-form'

import CheckoutPaymentProductList from './checkout-payment-product-list'

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
    const creditCardForm = (
        <div>
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

                <ReduxForm.Field component={Field} className="pw--overlayed-hint" name="email" label="CVV" hint={cvvHint}>
                    <input type="tel" noValidate />
                </ReduxForm.Field>
            </FieldRow>
        </div>
    )
    const hasExistingCreditCard = true
    const isNewCartSelected = true

    return (
        <div>
            <div className="t-checkout-payment__title u-padding-top-lg u-padding-bottom-lg">
                <h2 className="u-h4">Pay With Card</h2>
            </div>

            {hasExistingCreditCard ?
                <div className="u-padding-md u-padding-top-lg u-padding-bottom-lg u-border-light-top u-border-light-bottom u-bg-color-neutral-10">
                    <FieldRow>
                        <ReduxForm.Field
                            component={Field}
                            name="email"
                            label={<strong className="u-text-normal">VISA **** 5678</strong>}
                            caption="John Appleseed"
                        >
                            <input type="radio" noValidate />
                        </ReduxForm.Field>
                    </FieldRow>

                    {isNewCartSelected ?
                        <div className="u-padding-md u-margin-top-md u-border-light">
                            <FieldRow className="u-margin-bottom-md">
                                <ReduxForm.Field
                                    component={Field}
                                    name="email"
                                    label={<strong className="u-text-semi-bold">Add a new card</strong>}
                                >
                                    <input type="radio" checked noValidate />
                                </ReduxForm.Field>
                            </FieldRow>

                            {creditCardForm}
                        </div>
                    :
                        <div className="u-padding-md u-margin-top-md u-border-light">
                            <FieldRow>
                                <ReduxForm.Field
                                    component={Field}
                                    name="email"
                                    label={<strong className="u-text-semi-bold">Add a new card</strong>}
                                >
                                    <input type="radio" noValidate />
                                </ReduxForm.Field>
                            </FieldRow>
                        </div>
                    }
                </div>
            :
                <div className="u-padding-md u-padding-top-lg u-padding-bottom-lg u-border-light-top u-border-light-bottom u-bg-color-neutral-10">
                    {creditCardForm}
                </div>
            }
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
                    <ReduxForm.Field
                        component={Field}
                        name="email"
                        label={<strong className="u-text-semi-bold">Same as shipping address</strong>}
                        caption={shippingAddress}
                    >
                        <input type="checkbox" noValidate />
                    </ReduxForm.Field>
                </FieldRow>

                {newShippingAddressIsEnabled &&
                    <div className="u-padding-md u-padding-top-lg u-padding-bottom-lg u-border-light-top">
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

const CheckoutPaymentForm = (props) => {
    const {
        cart,
        handleSubmit,
        // disabled,
        // submitting
    } = props

    return (
        <form className="t-checkout-payment__form" onSubmit={handleSubmit} noValidate>
            <Grid className="u-center-piece">
                <GridSpan tablet={{span: 6, pre: 1, post: 1}} desktop={{span: 7}}>
                    {renderCreditCartForm()}
                    {renderBillingAddress()}
                </GridSpan>

                <GridSpan tablet={{span: 6, pre: 1, post: 1}} desktop={{span: 5}}>
                    <CheckoutPaymentProductList cart={cart} />
                </GridSpan>
            </Grid>
        </form>
    )
}

CheckoutPaymentForm.propTypes = {
    /**
     * The cart object, passed down from the parent Checkout-Payment container
     */
    cart: React.PropTypes.object,

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
