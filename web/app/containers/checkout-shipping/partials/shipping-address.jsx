import React from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as ReduxForm from 'redux-form'
import {normalizePhone} from '../../../utils/normalize-utils'
import classNames from 'classnames'

import {setShowAddNewAddress, showCompanyAndApt} from '../actions'
import {ADD_NEW_ADDRESS_FIELD, SHIPPING_FORM_NAME} from '../constants'
import {fetchShippingMethodsEstimate} from '../../../store/checkout/shipping/actions'
import {getIsLoggedIn} from '../../app/selectors'
import {getShippingFormTitle, getIsCompanyOrAptShown, getShowAddNewAddress} from '../selectors'
import {getCountries, getAvailableRegions} from '../../../store/checkout/locations/selectors'
import {getSavedAddresses} from '../../../store/checkout/shipping/selectors'

import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import Icon from 'progressive-web-sdk/dist/components/icon'


const ShippingAddressForm = ({
    countries,
    fetchShippingMethods,
    formTitle,
    handleShowAddNewAddress,
    handleShowCompanyAndApt,
    isCompanyOrAptShown,
    isLoggedIn,
    regions,
    savedAddresses,
    showAddNewAddress
}) => {

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

    const newShippingFields = (
        <div className="u-margin-top-md">
            <FieldRow>
                <ReduxForm.Field
                    component={Field}
                    name="name"
                    label="Full
                    Name"
                >
                    <input type="text" noValidate />
                </ReduxForm.Field>
            </FieldRow>

            <FieldRow>
                <ReduxForm.Field
                    component={Field}
                    name="addressLine1"
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
                        name="company"
                        label="Company"
                    >
                        <input
                            type="text"
                            noValidate
                            placeholder="Optional"
                        />
                    </ReduxForm.Field>

                    <ReduxForm.Field
                        component={Field}
                        name="addressLine2"
                        label="Apt #, suite etc."
                    >
                        <input
                            type="text"
                            noValidate
                            placeholder="Optional"
                        />
                    </ReduxForm.Field>
                </FieldRow>
            }

            <FieldRow>
                <ReduxForm.Field
                    component={Field}
                    name="city"
                    label="City"
                >
                    <input type="text" noValidate />
                </ReduxForm.Field>
            </FieldRow>

            <FieldRow>
                <ReduxForm.Field
                    component={Field}
                    className="pw--has-select"
                    name="country_id"
                    label="Country"
                >
                    <select>
                        {countries.map(({label, value}) =>
                            <option value={value} key={value}>
                                {label}
                            </option>
                        )}
                    </select>
                </ReduxForm.Field>
            </FieldRow>

            <FieldRow>
                {regions.length === 0 ?
                    <ReduxForm.Field
                        component={Field}
                        name="region"
                        label="State/Province"
                    >
                        <input type="text" noValidate />
                    </ReduxForm.Field>
                :
                    <ReduxForm.Field
                        component={Field}
                        className="pw--has-select"
                        name="region_id"
                        label="State/Province"
                    >
                        <select>
                            {regions.map(({label, value}) =>
                                <option value={value} key={`region-${value}`}>
                                    {label}
                                </option>
                            )}
                        </select>
                    </ReduxForm.Field>
                }
            </FieldRow>

            <FieldRow>
                <ReduxForm.Field
                    component={Field}
                    name="postcode"
                    label="Postal Code"
                    customEventHandlers={{
                        onBlur: fetchShippingMethods
                    }}
                >
                    <input type="text" noValidate />
                </ReduxForm.Field>
            </FieldRow>

            <FieldRow>
                <ReduxForm.Field
                    component={Field}
                    name="telephone"
                    label="Phone"
                    caption="In case we need to contact you about your order"
                    normalize={normalizePhone}
                >
                    <input type="tel" noValidate />
                </ReduxForm.Field>
            </FieldRow>
        </div>
    )

    const renderSavedAddresses = (address) => {
        const {city, country_id, firstname, id, lastname, postcode, region} = address
        const street = address.street.join(', ')
        const shippingAddress = (
            <div className="u-color-neutral-40">
                <p className="u-margin-bottom-sm">
                    {/* eslint-disable camelcase */}
                    {city}, {region.region_code}, {country_id}, {postcode}
                    {/* eslint-enable camelcase */}
                </p>
                <p>{firstname} {lastname}</p>
            </div>
        )

        return (
            <FieldRow key={id}>
                <ReduxForm.Field
                    component={Field}
                    name="shipping-address"
                    label={<strong className="u-text-semi-bold">{street}</strong>}
                    caption={shippingAddress}
                >
                    <input
                        type="radio"
                        noValidate
                        onChange={handleShowAddNewAddress}
                        value={id}
                    />
                </ReduxForm.Field>
            </FieldRow>
        )
    }

    const renderAddressFormOrSavedAddresses = () => {
        if (isLoggedIn && savedAddresses) {
            const classes = classNames({
                'u-border-light u-padding-md': showAddNewAddress
            })

            return [
                savedAddresses.map(renderSavedAddresses),
                <FieldRow key="addNewAddressField" className={classes}>
                    <div className="u-flex">
                        <ReduxForm.Field
                            component={Field}
                            name="shipping-address"
                            label={<strong className="u-text-semi-bold">Add a new address</strong>}
                        >
                            <input
                                type="radio"
                                noValidate
                                onChange={handleShowAddNewAddress}
                                value={ADD_NEW_ADDRESS_FIELD}
                            />
                        </ReduxForm.Field>

                        {showAddNewAddress && newShippingFields}
                    </div>
                </FieldRow>
            ]
        } else {
            return newShippingFields
        }
    }

    return (
        <div>
            <div className="t-checkout-shipping__title u-padding-top-lg u-padding-bottom-md">
                <h2 className="u-h4 u-text-uppercase">{formTitle}</h2>
            </div>

            <div className="u-padding-md u-border-light-top u-border-light-bottom u-bg-color-neutral-00">
                {renderAddressFormOrSavedAddresses()}
            </div>
        </div>
    )
}

ShippingAddressForm.propTypes = {
    /**
    * Countries available to ship to
    */
    countries: React.PropTypes.arrayOf(React.PropTypes.shape({
        label: React.PropTypes.string,
        value: React.PropTypes.string
    })),
    /**
     * Whether the form is disabled or not
     */
    disabled: React.PropTypes.bool,
    /**
    * Fetches the available shipping methods from the back end
    */
    fetchShippingMethods: React.PropTypes.func,
    /**
    * The title for the form
    */
    formTitle: React.PropTypes.string,

    /**
     * Handles whether or not to show the "Add New Address" form fields
     */
    handleShowAddNewAddress: React.PropTypes.func,

    /**
     * Shows the "Company" and "Apt #" fields
     */
    handleShowCompanyAndApt: React.PropTypes.func,
    /**
    * (Internal) added by redux form
    */
    invalid: React.PropTypes.bool,

    /**
     * Whether the "Company" and "Apt #" fields display
     */
    isCompanyOrAptShown: React.PropTypes.bool,

    /**
     * Whether the user is logged in or not
     */
    isLoggedIn: React.PropTypes.bool,
    /**
    * Regions available to ship to
    */
    regions: React.PropTypes.arrayOf(React.PropTypes.shape({
        country_id: React.PropTypes.string,
        label: React.PropTypes.string,
        title: React.PropTypes.string,
        value: React.PropTypes.string
    })),
    /**
    * Saved addresses from the user's account
    */
    savedAddresses: React.PropTypes.array,
    /**
    * Whether or not to show the "Add New Addres" form fields
    */
    showAddNewAddress: React.PropTypes.bool,

    /**
    * (Internal) Added by redux form
    */
    submitting: React.PropTypes.bool
}

const mapStateToProps = createPropsSelector({
    countries: getCountries,
    formTitle: getShippingFormTitle,
    isCompanyOrAptShown: getIsCompanyOrAptShown,
    isLoggedIn: getIsLoggedIn,
    regions: getAvailableRegions(SHIPPING_FORM_NAME),
    savedAddresses: getSavedAddresses,
    showAddNewAddress: getShowAddNewAddress
})

const mapDispatchToProps = {
    handleShowCompanyAndApt: showCompanyAndApt,
    handleShowAddNewAddress: (e) => {
        return setShowAddNewAddress(e.target.value === ADD_NEW_ADDRESS_FIELD)
    },
    fetchShippingMethods: () => fetchShippingMethodsEstimate(SHIPPING_FORM_NAME)
}



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShippingAddressForm)
