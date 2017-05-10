/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'
import {connect} from 'react-redux'
import * as ReduxForm from 'redux-form'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {CART_ESTIMATE_SHIPPING_MODAL, ESTIMATE_FORM_NAME} from '../constants'
import {closeModal} from '../../../store/modals/actions'
import {isModalOpen} from '../../../store/selectors'
import {getCountries, getAvailableRegions} from '../../../store/checkout/locations/selectors'
import {submitEstimateShipping} from '../actions'
import {getTaxInitiation} from '../selectors'

import Sheet from 'progressive-web-sdk/dist/components/sheet'
import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import IconLabelButton from '../../../components/icon-label-button'
import {HeaderBar, HeaderBarActions, HeaderBarTitle} from 'progressive-web-sdk/dist/components/header-bar'
import InlineLoader from 'progressive-web-sdk/dist/components/inline-loader'

export const CartEstimateShippingModal = ({closeModal, isOpen, countries, stateProvinces, submitEstimateShipping, isTaxRequested, handleSubmit}) => {
    return (
        <Sheet className="t-cart__estimate-shipping-modal" open={isOpen} onDismiss={closeModal} maskOpacity={0.7} effect="slide-right" coverage="85%">
            <HeaderBar>
                <HeaderBarTitle className="u-flex u-padding-start u-text-align-start">
                    <h1 className="u-h4 u-heading-family u-text-uppercase">
                        <span className="u-text-extra-lighter">Estimate Shipping</span>
                    </h1>
                </HeaderBarTitle>

                <HeaderBarActions>
                    <IconLabelButton iconName="close" label="" onClick={closeModal} />
                    <span className="u-visually-hidden">Close</span>
                </HeaderBarActions>
            </HeaderBar>

            <div className="u-padding-md">
                <form onSubmit={handleSubmit(submitEstimateShipping)}>
                    <FieldRow>
                        <ReduxForm.Field component={Field} className="pw--has-select" name="country_id" label="Country">
                            <select>
                                {countries.map(({label, value}) => <option value={value} key={value}>{label}</option>)}
                            </select>
                        </ReduxForm.Field>
                    </FieldRow>

                    <FieldRow>
                        {stateProvinces.length === 0 ?
                            <ReduxForm.Field component={Field} name="region" label="State/Province">
                                <input type="text" noValidate />
                            </ReduxForm.Field>
                        :
                            <ReduxForm.Field component={Field} className="pw--has-select" name="region_id" label="State/Province">
                                <select>
                                    {stateProvinces.map(({label, value}) => <option value={value} key={value}>{label}</option>)}
                                </select>
                            </ReduxForm.Field>
                        }

                    </FieldRow>

                    <FieldRow>
                        <ReduxForm.Field component={Field} name="postcode" label="Zip/Postal Code">
                            <input type="text" noValidate />
                        </ReduxForm.Field>
                    </FieldRow>

                    <FieldRow>
                        {!isTaxRequested ?
                            <Button className="c--secondary u-width-full u-text-uppercase" type="submit">
                                Get Estimate
                            </Button>
                        :
                            <Button className="c--secondary u-width-full">
                                <InlineLoader className="pw--white" title="Estimating" />
                            </Button>
                        }
                    </FieldRow>
                </form>
            </div>
        </Sheet>
    )
}

CartEstimateShippingModal.propTypes = {
    /**
     * A function used to set the navigation-sheet's state to closed
     */
    closeModal: React.PropTypes.func,

    countries: React.PropTypes.array,
    /**
    * (Internal) Added by Redux form
    */
    handleSubmit: React.PropTypes.func,

    /**
     * Whether the modal is open or not
     */
    isOpen: React.PropTypes.bool,

    isTaxRequested: React.PropTypes.bool,

    stateProvinces: React.PropTypes.array,
    /**
    * fetches the shipping estimate
    */
    submitEstimateShipping: React.PropTypes.func,
}

const mapStateToProps = createPropsSelector({
    countries: getCountries,
    isTaxRequested: getTaxInitiation,
    isOpen: isModalOpen(CART_ESTIMATE_SHIPPING_MODAL),
    stateProvinces: getAvailableRegions(ESTIMATE_FORM_NAME)
})

const mapDispatchToProps = {
    closeModal: () => closeModal(CART_ESTIMATE_SHIPPING_MODAL),
    submitEstimateShipping


}

const EstimateShippingReduxForm = ReduxForm.reduxForm({
    form: ESTIMATE_FORM_NAME
})(CartEstimateShippingModal)

export default connect(mapStateToProps, mapDispatchToProps)(EstimateShippingReduxForm)
