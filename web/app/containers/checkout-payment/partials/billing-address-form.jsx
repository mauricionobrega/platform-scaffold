import React, {PropTypes} from 'react'
import * as ReduxForm from 'redux-form'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

// Selectors
import * as selectors from '../selectors'

// Actions
import * as checkoutPaymentActions from '../actions'

// SDK Components
import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import {Icon} from 'progressive-web-sdk/dist/components/icon'

class BillingAddressForm extends React.Component {
    constructor(props) {
        super(props)

        this.handleSavedAddress = this.handleSavedAddress.bind(this)
        this.showCompanyAndAptField = this.showCompanyAndAptField.bind(this)
    }

    showCompanyAndAptField() {
        this.props.handleShowCompanyAndApt(true)
    }

    handleSavedAddress(e) {
        const isChecked = e.currentTarget.checked
        this.props.toggleNewAddressFields(!isChecked)
    }

    render() {
        const {
            isCompanyOrAptShown,
            newShippingAddressIsEnabled
        } = this.props

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
                onClick={this.showCompanyAndAptField}
            >
                <span className="u-color-brand u-text-letter-spacing-normal u-text-small">
                    Add company, apt #, suite etc.
                </span>
                <Icon name="chevron-down" className="u-margin-start-sm u-color-brand" />
            </Button>
        )

        return (
            <div>
                <div className="t-checkout-payment__title u-padding-top-lg u-padding-bottom-lg">
                    <h2 className="u-h4">Billing Address</h2>
                </div>

                <div className="u-border-light-top u-border-light-bottom u-bg-color-neutral-00">
                    <FieldRow className="u-padding-md">
                        <ReduxForm.Field
                            component={Field}
                            name="same-address"
                            label={<strong className="u-text-semi-bold">Same as shipping address</strong>}
                            caption={shippingAddress}
                        >
                            <input type="checkbox" defaultChecked onChange={this.handleSavedAddress} noValidate />
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
                                        <input type="text" noValidate placeholder="Optional" />
                                    </ReduxForm.Field>

                                    <ReduxForm.Field
                                        component={Field}
                                        name="address-line2"
                                        label="Apt #, suite etc."
                                    >
                                        <input type="text" noValidate placeholder="Optional" />
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
                                    {/* @TODO: Set Type to text or tel based on country! */}
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
}

BillingAddressForm.propTypes = {
    /**
     * Shows the "Company" and "Apt #" fields
     */
    handleShowCompanyAndApt: PropTypes.func,

    /**
     * Whether the "Company" and "Apt #" fields display
     */
    isCompanyOrAptShown: PropTypes.bool,

    /**
     * Whether the new address fields display
     */
    newShippingAddressIsEnabled: PropTypes.bool,

    /**
     * Toggle new address fields
     */
    toggleNewAddressFields: PropTypes.func
}

const BillingAddressReduxForm = ReduxForm.reduxForm({
    form: 'paymentBillingAddressForm'
})(BillingAddressForm)

const mapStateToProps = createStructuredSelector({
    isCompanyOrAptShown: selectors.getIsCompanyOrAptShown,
    newShippingAddressIsEnabled: selectors.getNewShippingAddressIsEnabled
})

const mapDispatchToProps = {
    toggleNewAddressFields: checkoutPaymentActions.toggleNewAddressFields,
    handleShowCompanyAndApt: checkoutPaymentActions.toggleCompanyAptField,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BillingAddressReduxForm)
