import React from 'react'
import * as ReduxForm from 'redux-form'

import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import {Grid, GridSpan} from '../../../components/grid'
import {Icon} from 'progressive-web-sdk/dist/components/icon'
import {ProgressSteps, ProgressStepsItem} from 'progressive-web-sdk/dist/components/progress-steps'

const renderEmailAddress = () => {
    const emailHint = (
        <Button innerClassName="u-color-brand">
            <Icon name="question" />
        </Button>
    )

    return (
        <div>
            <div className="t-checkout-shipping__title u-padding-top-lg u-padding-bottom-lg">
                <h2 className="u-h4">Email my receipt to</h2>
            </div>

            <div className="u-padding-md u-border-light-top u-border-light-bottom u-bg-color-neutral-10">
                <FieldRow>
                    <ReduxForm.Field component={Field} name="email" label="Email Address" hint={emailHint}>
                        <input type="email" noValidate />
                    </ReduxForm.Field>
                </FieldRow>
            </div>
        </div>
    )
}

const renderShippingAddress = () => {
    const addCompanyButton = (
        <Button className="c--is-anchor" innerClassName="u-padding-0">
            <span className="u-color-brand u-text-underline ">
                Add company or apt #
            </span>
        </Button>
    )

    return (
        <div>
            <div className="t-checkout-shipping__title u-padding-top-lg u-padding-bottom-lg">
                <h2 className="u-h4">Shipping Address</h2>
            </div>

            <div className="u-padding-md u-border-light-top u-border-light-bottom u-bg-color-neutral-10">
                <FieldRow>
                    <ReduxForm.Field component={Field} name="email" label="Full Name">
                        <input type="email" noValidate />
                    </ReduxForm.Field>
                </FieldRow>

                <FieldRow>
                    <ReduxForm.Field
                        component={Field}
                        name="email"
                        label="Address"
                        caption={addCompanyButton}
                    >
                        <input type="email" noValidate />
                    </ReduxForm.Field>
                </FieldRow>

                <FieldRow>
                    <ReduxForm.Field component={Field} name="email" label="Country">
                        <input type="email" noValidate />
                    </ReduxForm.Field>

                    <ReduxForm.Field component={Field} name="email" label="City">
                        <input type="email" noValidate />
                    </ReduxForm.Field>
                </FieldRow>

                <FieldRow>
                    <ReduxForm.Field component={Field} name="email" label="Province">
                        <input type="email" noValidate />
                    </ReduxForm.Field>
                </FieldRow>

                <FieldRow>
                    <ReduxForm.Field component={Field} name="email" label="Postal Code">
                        <input type="email" noValidate />
                    </ReduxForm.Field>
                </FieldRow>

                <FieldRow>
                    <ReduxForm.Field component={Field} name="email" label="Phone" caption="In case we need to contact you about your order">
                        <input type="email" noValidate />
                    </ReduxForm.Field>
                </FieldRow>
            </div>
        </div>
    )
}

const renderShippingMethod = () => {
    return (
        <div>
            <div className="t-checkout-shipping__title u-padding-top-lg u-padding-bottom-lg">
                <h2 className="u-h4">Shipping Method</h2>
            </div>

            <div className="u-padding-md u-border-light-top u-border-light-bottom u-bg-color-neutral-10">
                <FieldRow>
                    <ReduxForm.Field component={Field} name="email" label="Standard Shipping" caption="5-7 business days">
                        <input type="radio" noValidate />
                    </ReduxForm.Field>
                </FieldRow>

                <FieldRow>
                    <ReduxForm.Field component={Field} name="email" label="2 day shipping" caption="2-5 business days">
                        <input type="radio" noValidate />
                    </ReduxForm.Field>
                </FieldRow>

                <FieldRow>
                    <ReduxForm.Field component={Field} name="email" label="Next day delivery">
                        <input type="radio" noValidate />
                    </ReduxForm.Field>
                </FieldRow>

                <FieldRow className="u-margin-top-lg">
                    <Button type="submit" className="c--primary u-width-full">
                        Continue to Payment
                    </Button>
                </FieldRow>
            </div>
        </div>
    )
}

const CheckoutShippingForm = (props) => {
    const {
        handleSubmit,
        // disabled,
        // submitting
    } = props

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="u-bg-color-neutral-10 u-border-light-bottom">
                <ProgressSteps className="u-center-piece">
                    <ProgressStepsItem icon="cart" title="Cart" href="#" />
                    <ProgressStepsItem icon="star" current title="Shipping" />
                    <ProgressStepsItem icon="star" title="Payment" />
                    <ProgressStepsItem icon="check" title="Done" />
                </ProgressSteps>
            </div>

            <Grid className="u-center-piece">
                <GridSpan tablet={{span: 6, pre: 1, post: 1}} desktop={{span: 7}}>
                    {renderEmailAddress()}
                    {renderShippingAddress()}
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

const CheckoutShippingReduxForm = ReduxForm.reduxForm({
    form: 'newsletterForm',
    validate,
})(CheckoutShippingForm)

export default CheckoutShippingReduxForm
