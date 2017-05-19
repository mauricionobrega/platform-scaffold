/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import * as ReduxForm from 'redux-form'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

// Selectors
import * as selectors from '../selectors'
import {getCountries, getRegions} from '../../../store/checkout/locations/selectors'
import {getShippingFullName, getAddressLineOne, getCity, getPostcode} from '../../../store/checkout/shipping/selectors'

// Actions
import * as checkoutPaymentActions from '../actions'

// Local components
import CountrySelect from '../../../components/country-select'

// SDK Components
import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import Icon from 'progressive-web-sdk/dist/components/icon'

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
            city,
            countries,
            isCompanyOrAptShown,
            name,
            postcode,
            regions,
            street,
            newShippingAddressIsEnabled
        } = this.props

        const hasShippingAddress = !!(street || city || postcode || name)
        const shippingAddress = (
            <div>
                <p>{street}, {city}, {postcode}</p>
                <p>Name: {name}</p>
            </div>
        )

        const addDetails = (
            <Button
                className="c--is-anchor"
                innerClassName="c--no-min-height u-padding-0"
                onClick={this.showCompanyAndAptField}
            >
                <span className="u-color-brand u-text-letter-spacing-normal u-text-size-small">
                    Add company, apt #, suite etc.
                </span>
                <Icon name="chevron-down" className="u-margin-start-sm u-color-brand" />
            </Button>
        )

        return (
            <div>
                <div className="t-checkout-payment__title u-padding-top-lg u-padding-bottom-md">
                    <h2 className="u-h4 u-text-uppercase">Billing Address</h2>
                </div>

                <div className="u-border-light-top u-border-light-bottom u-bg-color-neutral-00 t-checkout-payment__card">
                    {hasShippingAddress &&
                        <FieldRow className="u-padding-md">
                            <ReduxForm.Field
                                component={Field}
                                name="billing_same_as_shipping"
                                type="checkbox"
                                label={<strong className="u-text-weight-medium">Same as shipping address</strong>}
                                caption={shippingAddress}
                                customEventHandlers={{
                                    onChange: this.handleSavedAddress
                                }}
                            >
                                <input type="checkbox" noValidate />
                            </ReduxForm.Field>
                        </FieldRow>
                    }

                    {(newShippingAddressIsEnabled || !hasShippingAddress) &&
                        <div className="u-padding-md u-padding-top-lg u-padding-bottom-lg u-border-light-top">
                            <FieldRow>
                                <ReduxForm.Field component={Field} name="name" label="Full name">
                                    <input type="text" noValidate />
                                </ReduxForm.Field>
                            </FieldRow>

                            <FieldRow>
                                <ReduxForm.Field
                                    component={Field}
                                    name="addressLine1"
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
                                        name="company"
                                        label="Company"
                                    >
                                        <input type="text" noValidate placeholder="Optional" />
                                    </ReduxForm.Field>

                                    <ReduxForm.Field
                                        component={Field}
                                        name="addressLine2"
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
                                <ReduxForm.Field component={Field} className="pw--has-select" name="regionId" label="State/Province">
                                    <select>
                                        {regions.map(({label, value}) => <option value={value} key={value}>{label}</option>)}
                                    </select>
                                </ReduxForm.Field>
                            </FieldRow>

                            <FieldRow>
                                <ReduxForm.Field component={Field} name="postcode" label="Zip/Postal code">
                                    {/* @TODO: Set Type to text or tel based on country! */}
                                    <input type="text" noValidate />
                                </ReduxForm.Field>
                            </FieldRow>

                            <FieldRow>
                                <CountrySelect countries={countries} />
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
    * City of saved shipping address
    */
    city: PropTypes.string,

    /**
    * Countries available to ship to
    */
    countries: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    })),

    /**
     * Shows the "Company" and "Apt #" fields
     */
    handleShowCompanyAndApt: PropTypes.func,

    /**
     * Whether the "Company" and "Apt #" fields display
     */
    isCompanyOrAptShown: PropTypes.bool,

    /**
    * Name of saved shipping address
    */
    name: PropTypes.string,
    /**
    * Whether the new address fields display
    */
    newShippingAddressIsEnabled: PropTypes.bool,

    /**
    * Postcode of saved shipping address
    */
    postcode: PropTypes.string,

    /**
    * Regions available to ship to
    */
    regions: PropTypes.arrayOf(PropTypes.shape({
        country_id: PropTypes.string,
        label: PropTypes.string,
        title: PropTypes.string,
        value: PropTypes.string
    })),

    /**
    * Street of saved shipping address
    */
    street: PropTypes.string,

    /**
     * Toggle new address fields
     */
    toggleNewAddressFields: PropTypes.func,
}

const mapStateToProps = createPropsSelector({
    city: getCity,
    countries: getCountries,
    isCompanyOrAptShown: selectors.getIsCompanyOrAptShown,
    name: getShippingFullName,
    newShippingAddressIsEnabled: selectors.getNewShippingAddressIsEnabled,
    postcode: getPostcode,
    regions: getRegions,
    street: getAddressLineOne,
})

const mapDispatchToProps = {
    toggleNewAddressFields: checkoutPaymentActions.toggleNewAddressFields,
    handleShowCompanyAndApt: checkoutPaymentActions.toggleCompanyAptField,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BillingAddressForm)
