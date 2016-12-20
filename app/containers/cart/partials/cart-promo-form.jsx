import React from 'react'
import * as ReduxForm from 'redux-form'

import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'

const CartPromoForm = (props) => {
    const {handleSubmit, disabled, submitting} = props
    return (
        <form onSubmit={handleSubmit} noValidate>
            <FieldRow>
                <ReduxForm.Field component={Field} name="email">
                    <input
                        className="t-cart__promo-input"
                        type="text"
                        placeholder="Enter promo or gift code"
                        noValidate
                    />
                </ReduxForm.Field>

                <Button type="submit"
                    className="c--tertiary u-margin-0"
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
     * Redux-form internal
     */
    submitting: React.PropTypes.bool
}

const validate = (values) => {
    const errors = {}

    console.log(values)
    // if (values.email && !values.email.match('@')) {  // Obviously not for real
    //     errors.email = 'Enter a valid email address'
    // }

    return errors
}

const CartPromoReduxForm = ReduxForm.reduxForm({
    form: 'cartPromoForm',
    validate,
})(CartPromoForm)

export default CartPromoReduxForm
