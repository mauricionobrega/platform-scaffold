import React from 'react'
import * as ReduxForm from 'redux-form'

import CheckoutPaymentProductList from './checkout-payment-product-list'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import {Grid, GridSpan} from '../../../components/grid'
import {Icon} from 'progressive-web-sdk/dist/components/icon'
import Image from 'progressive-web-sdk/dist/components/image'

const CREDIT_CARDS = { /* eslint-disable key-spacing */
    amex:       ['cc-american-express@3x.png', 'hint-amex@3x.png', 'Amex logo'],
    discovery:  ['cc-discovery@3x.png', 'hint-visa-mc@3x.png', 'Discovery logo'],
    mastercard: ['cc-mastercard@3x.png', 'hint-visa-mc@3x.png', 'Mastercard logo'],
    unionpay:   ['cc-unionpay@3x.png', 'hint-visa-mc@3x.png', 'UnionPay logo'],
    visa:       ['cc-visa@3x.png', 'hint-visa-mc@3x.png', 'Visa logo'],
} /* eslint-enable key-spacing */

const renderCreditCartForm = () => {
    const currentCard = CREDIT_CARDS.visa
    const ccHint = <Image src={getAssetUrl(`static/img/checkout/${currentCard[0]}`)} alt={currentCard[2]} height="29px" width="48px" />
    const cvvHint = <Image src={getAssetUrl(`static/img/checkout/${currentCard[1]}`)} alt="Demonstrating that the CCV is on the back of the Credit Card" height="29px" width="48px" />
    const creditCardForm = (
        <div>
            <FieldRow>
                <ReduxForm.Field component={Field} name="name" label="Cardholder Name">
                    <input type="text" noValidate />
                </ReduxForm.Field>
            </FieldRow>

            <FieldRow>
                <ReduxForm.Field component={Field} className="pw--overlayed-hint t-checkout-payment__credit-card-hints" name="ccnumber" label="Card number" hint={ccHint}>
                    <input type="tel" noValidate />
                </ReduxForm.Field>
            </FieldRow>

            <FieldRow>
                <ReduxForm.Field component={Field} name="ccexpiry" label="Expiry" placeholder="mm/yyyy">
                    <input type="number" noValidate />
                </ReduxForm.Field>

                <ReduxForm.Field component={Field} className="pw--overlayed-hint t-checkout-payment__credit-card-hints" name="cvv" label="CVV" hint={cvvHint}>
                    <input type="tel" noValidate />
                </ReduxForm.Field>
            </FieldRow>
        </div>
    )
    const hasExistingCreditCard = true
    const isNewCardInputSelected = true

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
                            name="selectCreditCard"
                            label={<strong className="u-text-normal">VISA **** **** **** 5678</strong>}
                            caption="John Appleseed"
                        >
                            <input type="radio" noValidate />
                        </ReduxForm.Field>
                    </FieldRow>

                    <div className={isNewCardInputSelected ? 'u-padding-md u-margin-top-md u-border-light' : 'u-margin-top-md'}>
                        <FieldRow>
                            <ReduxForm.Field
                                component={Field}
                                name="selectCreditCard"
                                label={<span className={isNewCardInputSelected && 'u-text-semi-bold'}>Add a new card</span>}
                            >
                                <input type="radio" checked={isNewCardInputSelected} noValidate />
                            </ReduxForm.Field>
                        </FieldRow>

                        {isNewCardInputSelected &&
                            <div className="u-margin-top-md">
                                {creditCardForm}
                            </div>
                        }
                    </div>
                </div>
            :
                <div className="u-padding-md u-padding-top-lg u-padding-bottom-lg u-border-light-top u-border-light-bottom u-bg-color-neutral-10">
                    {creditCardForm}
                </div>
            }
        </div>
    )
}

const renderBillingAddress = (isCompanyOrAptShown, handleShowCompanyAndApt) => {
    const shippingAddress = (
        <div>
            <p>720 W Georgia, Vancouver, V4R5TS</p>
            <p>Name: John Appleseed</p>
        </div>
    )

    const addDetails = (
        <Button
            className="c--is-anchor"
            innerClassName="c--no-min-height u-padding-0"
            onClick={handleShowCompanyAndApt}
        >
            <span className="u-color-brand u-text-letter-spacing-normal u-text-small">
                Add company, apt #, suite etc.
            </span>
            <Icon name="chevron-down" className="u-margin-start-sm u-color-brand" />
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
                            <ReduxForm.Field component={Field} name="fullName" label="Full name">
                                <input type="text" noValidate />
                            </ReduxForm.Field>
                        </FieldRow>

                        <FieldRow>
                            <ReduxForm.Field
                                component={Field}
                                name="address"
                                label="Address"
                                caption={!isCompanyOrAptShown && addDetails}
                            >
                                <input type="text" noValidate />
                            </ReduxForm.Field>
                        </FieldRow>

                        {isCompanyOrAptShown &&
                            <FieldRow>
                                <ReduxForm.Field
                                    component={Field}
                                    name="organization"
                                    label="Company"
                                >
                                    <input type="text" noValidate />
                                </ReduxForm.Field>

                                <ReduxForm.Field
                                    component={Field}
                                    name="address-line2"
                                    label="Apt #, suite etc."
                                >
                                    <input type="text" noValidate />
                                </ReduxForm.Field>
                            </FieldRow>
                        }

                        <FieldRow>
                            <ReduxForm.Field component={Field} name="city" label="City">
                                <input type="text" noValidate />
                            </ReduxForm.Field>
                        </FieldRow>

                        <FieldRow>
                            <ReduxForm.Field component={Field} name="state" label="State/Province">
                                <select>
                                    <option>Select option</option>
                                </select>
                            </ReduxForm.Field>
                        </FieldRow>

                        <FieldRow>
                            <ReduxForm.Field component={Field} name="zip" label="Zip/Postal code">
                                <input type="text" noValidate />
                            </ReduxForm.Field>
                        </FieldRow>

                        <FieldRow>
                            <ReduxForm.Field component={Field} name="country" label="Country">
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
        handleShowCompanyAndApt,
        handleSubmit,
        isCompanyOrAptShown,
        // disabled,
        // submitting
    } = props

    return (
        <form className="t-checkout-payment__form" onSubmit={handleSubmit} noValidate>
            <Grid className="u-center-piece">
                <GridSpan tablet={{span: 6, pre: 1, post: 1}} desktop={{span: 7}}>
                    {renderCreditCartForm()}
                    {renderBillingAddress(isCompanyOrAptShown, handleShowCompanyAndApt)}
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
     * Shows the "Company" and "Apt #" fields
     */
    handleShowCompanyAndApt: React.PropTypes.func,

    /**
     * Redux-form internal
     */
    handleSubmit: React.PropTypes.func,

    /**
     * Whether the "Company" and "Apt #" fields display
     */
    isCompanyOrAptShown: React.PropTypes.bool,

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
