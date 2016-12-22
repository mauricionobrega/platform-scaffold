import React from 'react'
import * as ReduxForm from 'redux-form'

import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import {Grid, GridSpan} from '../../../components/grid'
import {Icon} from 'progressive-web-sdk/dist/components/icon'
import Link from 'progressive-web-sdk/dist/components/link'

const renderEmailAddress = (onEmailHintClick) => {
    const emailHint = (
        <Button innerClassName="u-color-brand" onClick={onEmailHintClick}>
            <Icon name="help" />
        </Button>
    )
    const passwordHint = (
        <Link className="u-color-brand" href="/customer/account/forgotpassword/">
            Forgot password
        </Link>
    )
    const isSigningIn = true

    return (
        <div>
            <div className="t-checkout-shipping__email-title" />

            <div className="u-padding-md u-border-light-top u-border-light-bottom u-bg-color-neutral-10">
                <FieldRow>
                    <ReduxForm.Field component={Field} className="pw--overlayed-hint" name="email" label="Email my receipt to" hint={emailHint}>
                        <input type="email" noValidate />
                    </ReduxForm.Field>
                </FieldRow>

                {isSigningIn &&
                    <FieldRow>
                        <ReduxForm.Field component={Field} name="email" label="Password" hint={passwordHint}>
                            <input type="email" noValidate />
                        </ReduxForm.Field>
                    </FieldRow>
                }

                {isSigningIn &&
                    <FieldRow>
                        <Button className="c--secondary u-width-full u-text-uppercase">
                            <Icon name="user" className="u-margin-end" />
                            Sign In
                        </Button>
                    </FieldRow>
                }
            </div>
        </div>
    )
}

const renderShippingAddress = (isCompanyOrAptShown, handleShowCompanyAndApt) => {
    const addCompanyButton = (
        <Button
            className="c--is-anchor"
            innerClassName="c--no-min-height u-padding-0"
            onClick={handleShowCompanyAndApt}
            >
            <span className="u-color-brand u-text-letter-spacing-normal u-text-small">
                Add company or apt #
            </span>
            <Icon name="chevron-down" className="u-margin-start-sm u-color-brand" />
        </Button>
    )
    const shippingAddress = (
        <div>
            <p>Vancouver, BC, Canada, V4R5TS</p>
            <p>Name: John Appleseet</p>
        </div>
    )

    return (
        <div>
            <div className="t-checkout-shipping__title u-padding-top-lg u-padding-bottom-lg">
                <h2 className="u-h4">Shipping Address</h2>
            </div>

            <div className="u-padding-md u-border-light-top u-border-light-bottom u-bg-color-neutral-10">
                <FieldRow>
                    <ReduxForm.Field
                        component={Field}
                        name="email"
                        label={<strong className="u-text-semi-bold">725 West Georgia</strong>}
                        caption={shippingAddress}
                    >
                        <input type="radio" noValidate />
                    </ReduxForm.Field>
                </FieldRow>

                <div className="u-padding-md u-margin-top-md u-border-light">
                    <FieldRow>
                        <ReduxForm.Field
                            component={Field}
                            name="email"
                            label={<strong className="u-text-semi-bold">Add a new address</strong>}
                        >
                            <input type="radio" checked noValidate />
                        </ReduxForm.Field>
                    </FieldRow>

                    <FieldRow>
                        <ReduxForm.Field component={Field} name="email" label="Full Name">
                            <input type="text" noValidate />
                        </ReduxForm.Field>
                    </FieldRow>

                    <FieldRow>
                        <ReduxForm.Field
                            component={Field}
                            name="email"
                            label="Address"
                            caption={!isCompanyOrAptShown && addCompanyButton}
                        >
                            <input type="text" noValidate />
                        </ReduxForm.Field>
                    </FieldRow>

                    {isCompanyOrAptShown &&
                        <FieldRow>
                            <ReduxForm.Field
                                component={Field}
                                name="email"
                                label="Company"
                            >
                                <input type="text" noValidate />
                            </ReduxForm.Field>

                            <ReduxForm.Field
                                component={Field}
                                name="email"
                                label="Apt #, suite etc."
                            >
                                <input type="text" noValidate />
                            </ReduxForm.Field>
                        </FieldRow>
                    }

                    <FieldRow>
                        <ReduxForm.Field component={Field} name="email" label="City">
                            <input type="text" noValidate />
                        </ReduxForm.Field>
                    </FieldRow>

                    <FieldRow>
                        <ReduxForm.Field component={Field} name="email" label="Country">
                            <select>
                                <option>Canada</option>
                            </select>
                        </ReduxForm.Field>
                    </FieldRow>

                    <FieldRow>
                        <ReduxForm.Field component={Field} name="email" label="Province">
                            <input type="text" noValidate />
                        </ReduxForm.Field>
                    </FieldRow>

                    <FieldRow>
                        <ReduxForm.Field component={Field} name="email" label="Postal Code">
                            <input type="text" noValidate />
                        </ReduxForm.Field>
                    </FieldRow>

                    <FieldRow>
                        <ReduxForm.Field
                            component={Field}
                            name="email"
                            label="Phone"
                            caption="In case we need to contact you about your order"
                        >
                            <input type="email" noValidate />
                        </ReduxForm.Field>
                    </FieldRow>
                </div>
            </div>
        </div>
    )
}

const renderShippingMethod = () => {
    const methodLabel = (
        <strong className="u-flexbox u-text-semi-bold">
            <div className="u-flex">Fixed - Flate rate</div>
            <div className="u-flex-none">$5.00</div>
        </strong>
    )

    return (
        <div>
            <div className="t-checkout-shipping__title u-padding-top-lg u-padding-bottom-lg">
                <h2 className="u-h4">Shipping Method</h2>
            </div>

            <div className="u-padding-md u-border-light-top u-border-light-bottom u-bg-color-neutral-10">
                <FieldRow>
                    <ReduxForm.Field component={Field} name="email" label={methodLabel}>
                        <input type="radio" noValidate />
                    </ReduxForm.Field>
                </FieldRow>

                <FieldRow className="u-margin-top-lg">
                    <Button type="submit" className="c--primary u-width-full u-text-uppercase">
                        Continue to Payment
                    </Button>
                </FieldRow>
            </div>
        </div>
    )
}

const CheckoutShippingForm = (props) => {
    const {
        handleShowCompanyAndApt,
        handleSubmit,
        isCompanyOrAptShown,
        onEmailHintClick
        // disabled,
        // submitting
    } = props

    return (
        <form className="t-checkout-shipping__form" onSubmit={handleSubmit} noValidate>
            <Grid className="u-center-piece">
                <GridSpan tablet={{span: 6, pre: 1, post: 1}} desktop={{span: 7}}>
                    {renderEmailAddress(onEmailHintClick)}
                    {renderShippingAddress(isCompanyOrAptShown, handleShowCompanyAndApt)}
                </GridSpan>

                <GridSpan tablet={{span: 6, pre: 1, post: 1}} desktop={{span: 5}}>
                    {renderShippingMethod()}
                </GridSpan>
            </Grid>
        </form>
    )
}

CheckoutShippingForm.propTypes = {
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
    submitting: React.PropTypes.bool,

    onEmailHintClick: React.PropTypes.func,
}

const validate = (values) => {
    const errors = {}
    if (values.email && !values.email.match('@')) {  // Obviously not for real
        errors.email = 'Enter a valid email address'
    }
    return errors
}

const CheckoutShippingReduxForm = ReduxForm.reduxForm({
    form: 'shippingForm',
    validate,
})(CheckoutShippingForm)

export default CheckoutShippingReduxForm
