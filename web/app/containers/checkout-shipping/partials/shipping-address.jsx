import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectorToJS} from '../../../utils/selector-utils'
import * as ReduxForm from 'redux-form'

import {showCompanyAndApt} from '../actions'
import {getShippingFormTitle, getIsCompanyOrAptShown} from '../selectors'
import {getCountries, getRegions} from '../../../store/checkout/locations/selectors'

import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import {Icon} from 'progressive-web-sdk/dist/components/icon'


const ShippingAddressForm = ({
    countries,
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
            <div className="t-checkout-shipping__title u-padding-top-lg u-padding-bottom-lg">
                <h2 className="u-h4">{formTitle}</h2>
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
                            name="address-line1"
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
                                name="organization"
                                label="Company"
                            >
                                <input type="text" noValidate />
                            </ReduxForm.Field>

                            <ReduxForm.Field
                                component={Field}
                                name="address-line2"
                                label="Apt #, suite etc."
                            >
                                <input type="text" noValidate />
                            </ReduxForm.Field>
                        </FieldRow>
                    }

                    <FieldRow>
                        <ReduxForm.Field component={Field} name="shipping-city" label="City">
                            <input type="text" noValidate />
                        </ReduxForm.Field>
                    </FieldRow>

                    <FieldRow>
                        <ReduxForm.Field component={Field} name="shipping-country" label="Country">
                            <select>
                                {countries.map(({label, value}) => <option value={value} key={value}>{label}</option>)}
                            </select>
                        </ReduxForm.Field>
                    </FieldRow>

                    <FieldRow>
                        <ReduxForm.Field component={Field} name="shipping-state" label="Province">
                            <select>
                                {regions.map(({label, value}) => <option value={value} key={value}>{label}</option>)}
                            </select>
                        </ReduxForm.Field>
                    </FieldRow>

                    <FieldRow>
                        <ReduxForm.Field component={Field} name="shipping-postal-code" label="Postal Code">
                            <input type="text" noValidate />
                        </ReduxForm.Field>
                    </FieldRow>

                    <FieldRow>
                        <ReduxForm.Field
                            component={Field}
                            name="home-phone"
                            label="Phone"
                            caption="In case we need to contact you about your order"
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
    countries: React.PropTypes.arrayOf(React.PropTypes.shape({
        label: React.PropTypes.string,
        value: React.PropTypes.string
    })),
    /**
     * Whether the form is disabled or not
     */
    disabled: React.PropTypes.bool,
    /**
    * The title for the form
    */
    formTitle: React.PropTypes.string,

    /**
     * Shows the "Company" and "Apt #" fields
     */
    handleShowCompanyAndApt: React.PropTypes.func,

    /**
     * Whether the "Company" and "Apt #" fields display
     */
    isCompanyOrAptShown: React.PropTypes.bool,
    regions: React.PropTypes.arrayOf(React.PropTypes.shape({
        country_id: React.PropTypes.string,
        label: React.PropTypes.string,
        title: React.PropTypes.string,
        value: React.PropTypes.string
    })),
}

const mapStateToProps = createStructuredSelector({
    countries: selectorToJS(getCountries),
    formTitle: getShippingFormTitle,
    isCompanyOrAptShown: getIsCompanyOrAptShown,
    regions: selectorToJS(getRegions)
})

const mapDispatchToProps = {
    handleShowCompanyAndApt: showCompanyAndApt,
}



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShippingAddressForm)
