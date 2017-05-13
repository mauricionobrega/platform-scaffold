/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'
import * as ReduxForm from 'redux-form'
import {connect} from 'react-redux'

import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'

import {submitPromoCode} from '../actions' // @TODO: Figure out where this is coming from

const CartPromoForm = (props) => {
    const {handleSubmit, submitPromoCode, disabled, submitting} = props
    return (
        <form onSubmit={handleSubmit(submitPromoCode)} noValidate>
            <FieldRow>
                <ReduxForm.Field component={Field} name="promo">
                    <input
                        className="t-cart__promo-input"
                        type="text"
                        placeholder="Enter promo or gift code"
                        noValidate
                    />
                </ReduxForm.Field>

                <Button type="submit"
                    className="c--tertiary u-margin-0 u-text-uppercase"
                    disabled={disabled || submitting}>
                    Apply
                </Button>
            </FieldRow>
        </form>
    )
}

CartPromoForm.propTypes = {
    /**
     * Whether the form is disabled or not
     */
    disabled: React.PropTypes.bool,

    /**
     * Redux-form internal
     */
    handleSubmit: React.PropTypes.func,

    /**
     * Submits the promo code
     */
    submitPromoCode: React.PropTypes.func,

    /**
     * Redux-form internal
     */
    submitting: React.PropTypes.bool
}

const validate = () => {
    const errors = {}

    // if (values.email && !values.email.match('@')) {  // Obviously not for real
    //     errors.email = 'Enter a valid email address'
    // }

    return errors
}

const mapDispatchToProps = {
    submitPromoCode
}

const CartPromoReduxForm = ReduxForm.reduxForm({
    form: 'cartPromoForm',
    validate,
})(CartPromoForm)

export default connect(
    null,
    mapDispatchToProps
)(CartPromoReduxForm)
