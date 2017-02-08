import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectorToJS} from '../../../utils/selector-utils'
import * as ReduxForm from 'redux-form'

import {fetchShippingMethods} from '../actions'
import {getShippingMethods, getCustomerEntityID} from '../selectors'

import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import ShippingMethodLabel from './shipping-method-label'


class ShippingMethod extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (!nextProps.shippingMethods.length && nextProps.entityID) {
            this.props.fetchShippingMethods()
        }
    }

    render() {
        const {shippingMethods} = this.props

        return (
            <div>
                <div className="t-checkout-shipping__title u-padding-top-lg u-padding-bottom-lg">
                    <h2 className="u-h4">Shipping Method</h2>
                </div>

                <div className="u-padding-md u-border-light-top u-border-light-bottom u-bg-color-neutral-00">
                    {shippingMethods && shippingMethods.map(({label, cost, value}, idx) => {
                        return (
                            <FieldRow key={idx}>
                                <ReduxForm.Field component={Field} name="shipping_method" type="radio" label={<ShippingMethodLabel label={label} cost={cost} />}>
                                    <input type="radio" noValidate value={value} />
                                </ReduxForm.Field>
                            </FieldRow>
                        )
                    })}

                    <FieldRow className="u-margin-top-lg">
                        <Button type="submit" className="c--primary u-width-full u-text-uppercase">
                            Continue to Payment
                        </Button>
                    </FieldRow>
                </div>
            </div>
        )
    }
}

ShippingMethod.propTypes = {
    /**
    * An identifier for the current users cart
    */
    entityID: PropTypes.string,
    /**
    * Fetches the available shipping methods
    */
    fetchShippingMethods: PropTypes.func,
    /**
    * The available shipping methods for the order
    */
    shippingMethods: PropTypes.arrayOf(PropTypes.shape({
        cost: PropTypes.string,
        label: PropTypes.string,
        value: PropTypes.string
    }))
}

const mapStateToProps = createStructuredSelector({
    entityID: getCustomerEntityID,
    shippingMethods: selectorToJS(getShippingMethods)
})

const mapDispatchToProps = {
    fetchShippingMethods
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShippingMethod)
