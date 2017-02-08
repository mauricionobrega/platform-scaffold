import React from 'react'
import * as ReduxForm from 'redux-form'

import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'

const ShippingMethod = () => {
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

            <div className="u-padding-md u-border-light-top u-border-light-bottom u-bg-color-neutral-00">
                <FieldRow>
                    <ReduxForm.Field component={Field} name="shipping-method" label={methodLabel}>
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

ShippingMethod.propTypes = {
}

export default ShippingMethod
