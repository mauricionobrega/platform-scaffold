import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as ReduxForm from 'redux-form'

import {getShippingMethods} from '../../../store/checkout/selectors'

import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import ShippingMethodLabel from './shipping-method-label'


const ShippingMethod = ({shippingMethods}) => {
    return (
        <div>
            <div className="t-checkout-shipping__title u-padding-top-lg u-padding-bottom-md">
                <h2 className="u-h4 u-text-uppercase">Shipping Method</h2>
            </div>

            <div className="u-padding-md u-border-light-top u-border-light-bottom u-bg-color-neutral-00">
                {shippingMethods && shippingMethods.map(({label, cost, id}) => {
                    return (
                        <FieldRow key={id}>
                            <ReduxForm.Field
                                component={Field}
                                name="shipping_method"
                                type="radio"
                                value={id}
                                label={<ShippingMethodLabel label={label} cost={cost} />}
                            >
                                <input type="radio" noValidate />
                            </ReduxForm.Field>
                        </FieldRow>
                    )
                })}

                <FieldRow className="u-margin-top-lg">
                    <Button type="submit" className="c--primary u-width-full u-text-uppercase qa-checkout__continue-to-payment">
                        Continue to Payment
                    </Button>
                </FieldRow>
            </div>
        </div>
    )
}

ShippingMethod.propTypes = {
    /**
    * The available shipping methods for the order
    */
    shippingMethods: PropTypes.arrayOf(PropTypes.shape({
        cost: PropTypes.string,
        info: PropTypes.string,
        label: PropTypes.string,
        value: PropTypes.string
    })),
    /**
    * (Internal) Added by redux form
    */
    submitting: PropTypes.bool
}

const mapStateToProps = createPropsSelector({
    shippingMethods: getShippingMethods
})


export default connect(
    mapStateToProps
)(ShippingMethod)
