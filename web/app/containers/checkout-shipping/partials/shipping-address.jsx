import React from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as ReduxForm from 'redux-form'
import {normalizePhone} from '../../../utils/normalize-utils'

import {showCompanyAndApt} from '../actions'
import {SHIPPING_FORM_NAME} from '../constants'
import {fetchShippingMethodsEstimate} from '../../../store/checkout/shipping/actions'
import {getShippingFormTitle, getIsCompanyOrAptShown} from '../selectors'
import {getCountries, getAvailableRegions} from '../../../store/checkout/locations/selectors'

import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import Icon from 'progressive-web-sdk/dist/components/icon'


const ShippingAddressForm = ({
    countries,
    fetchShippingMethods,
    formTitle,
    handleShowCompanyAndApt,
    isCompanyOrAptShown,
    regions
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


    return (
        <div>
            <div className="t-checkout-shipping__title u-padding-top-lg u-padding-bottom-md">
                <h2 className="u-h4 u-text-uppercase">{formTitle}</h2>
            </div>

            <div className="u-padding-md u-border-light-top u-border-light-bottom u-bg-color-neutral-00">
                {/* <FieldRow>
                    <ReduxForm.Field
                        component={Field}
                        name="shipping-address"
                        label={<strong className="u-text-semi-bold">725 West Georgia</strong>}
                        caption={shippingAddress}
                    >
                        <input type="radio" noValidate />
                    </ReduxForm.Field>
                </FieldRow> */ }

                <div className="u-padding-md u-margin-top-md u-border-light">
                    {/* <FieldRow>
                        <ReduxForm.Field
                            component={Field}
                            name="address"
                            label={<strong className="u-text-semi-bold">Add a new address</strong>}
                        >
                            <input type="radio" checked noValidate />
                        </ReduxForm.Field>
                    </FieldRow>*/}

                    <FieldRow>
                        <ReduxForm.Field component={Field} name="name" label="Full Name">
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
                        <ReduxForm.Field component={Field} name="country_id" label="Country">
                            <select>
                                {countries.map(({label, value}) => <option value={value} key={value}>{label}</option>)}
                            </select>
                        </ReduxForm.Field>
                    </FieldRow>

                    <FieldRow>
                        {regions.length === 0 ?
                            <ReduxForm.Field component={Field} name="region" label="State/Province">
                                <input type="text" noValidate />
                            </ReduxForm.Field>
                        :
                            <ReduxForm.Field component={Field} name="region_id" label="State/Province">
                                <select>
                                    {regions.map(({label, value}) => <option value={value} key={value}>{label}</option>)}
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
    * Regions available to ship to
    */
    regions: React.PropTypes.arrayOf(React.PropTypes.shape({
        country_id: React.PropTypes.string,
        label: React.PropTypes.string,
        title: React.PropTypes.string,
        value: React.PropTypes.string
    })),
    /**
    * (Internal) Added by redux form
    */
    submitting: React.PropTypes.bool
}

const mapStateToProps = createPropsSelector({
    countries: getCountries,
    formTitle: getShippingFormTitle,
    isCompanyOrAptShown: getIsCompanyOrAptShown,
    regions: getAvailableRegions(SHIPPING_FORM_NAME)
})

const mapDispatchToProps = {
    handleShowCompanyAndApt: showCompanyAndApt,
    fetchShippingMethods: () => fetchShippingMethodsEstimate(SHIPPING_FORM_NAME)
}



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShippingAddressForm)
