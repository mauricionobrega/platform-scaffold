import React from 'react'
import * as ReduxForm from 'redux-form'
import {connect} from 'react-redux'

import {submitShipping} from '../actions'

import {Grid, GridSpan} from '../../../components/grid'
import ShippingAddressForm from './shipping-address'
import ShippingEmail from './shipping-email'
import ShippingMethod from './shipping-method'


const CheckoutShippingForm = ({
    handleSubmit,
    submitShipping
    // disabled,
    // submitting
}) => {

    return (
        <form className="t-checkout-shipping__form" onSubmit={handleSubmit(submitShipping)} noValidate>
            <Grid className="u-center-piece">
                <GridSpan tablet={{span: 6, pre: 1, post: 1}} desktop={{span: 7}}>
                    <ShippingEmail />
                    <ShippingAddressForm />
                </GridSpan>

                <GridSpan tablet={{span: 6, pre: 1, post: 1}} desktop={{span: 5}}>
                    <ShippingMethod />
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
    * Submits the shipping form information to the server
    */
    submitShipping: React.PropTypes.func,
    /**
     * Redux-form internal
     */
    submitting: React.PropTypes.bool,
}

const validate = (values) => {
    const errors = {}
    if (values.email && !values.email.match('@')) {  // Obviously not for real
        errors.email = 'Enter a valid email address'
    }
    return errors
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
    submitShipping
}


const CheckoutShippingReduxForm = ReduxForm.reduxForm({
    form: 'shippingForm',
    validate,
})(CheckoutShippingForm)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckoutShippingReduxForm)
