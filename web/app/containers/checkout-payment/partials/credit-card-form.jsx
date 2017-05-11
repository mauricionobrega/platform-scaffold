/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import * as ReduxForm from 'redux-form'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import classNames from 'classnames'
import {PAYMENT_EXISTING_CARD, PAYMENT_NEW_CARD, AMEX_CARD, DEFAULT_CARD, NUMBER_FIELD} from '../constants'

// Selectors
import * as selectors from '../selectors'

// Actions
import * as checkoutPaymentActions from '../actions'

// SDK Components
import CardInput from 'progressive-web-sdk/dist/components/card-input'
import ExpiryDate from 'progressive-web-sdk/dist/components/expiry-date'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import Image from 'progressive-web-sdk/dist/components/image'

const CVV = { /* eslint-disable key-spacing */
    [AMEX_CARD]: {
        alt: 'Demonstrating that the CVV is on the front of the Credit Card',
        src: 'hint-amex@3x.png',
        cvvLength: 4
    },
    [DEFAULT_CARD]: {
        alt: 'Demonstrating that the CVV is on the back of the Credit Card',
        src: 'hint-visa-mc@3x.png',
        cvvLength: 3
    }
} /* eslint-enable key-spacing */

class CreditCardForm extends React.Component {
    constructor(props) {
        super(props)

        this.handleRadioChange = this.handleRadioChange.bind(this)
        this.handleCVV = this.handleCVV.bind(this)
    }

    handleRadioChange(e) {
        const value = e.currentTarget.value
        const isNewCard = value === PAYMENT_NEW_CARD

        this.props.toggleCardInputRadio(isNewCard)
    }

    handleCVV(e) {
        const input = e.target

        // Set the cvv type based on the card number
        if (input.name === NUMBER_FIELD) {
            const amexRegex = new RegExp('^3[47]')
            const value = input.value
            const currentType = this.props.cvvType

            // Don't trigger the actions unless things have changed
            if (value.match(amexRegex) && currentType !== AMEX_CARD) {
                this.props.setCvvType(AMEX_CARD)
            } else if (!value.match(amexRegex) && currentType !== DEFAULT_CARD) {
                this.props.setCvvType(DEFAULT_CARD)
            }
        }
    }

    render() {
        const {
            cvvType,
            hasExistingCreditCard,
            isNewCardInputSelected
        } = this.props

        const currentCard = CVV[cvvType]
        const cvvHint = <Image src={getAssetUrl(`static/img/checkout/${currentCard.src}`)} alt={currentCard.alt} height="29px" width="48px" />

        const creditCardForm = (
            <div onChange={this.handleCVV}>
                <FieldRow>
                    <ReduxForm.Field component={Field} name="name" label="Cardholder Name">
                        <input type="text" noValidate />
                    </ReduxForm.Field>
                </FieldRow>

                <FieldRow>
                    <ReduxForm.Field component={Field} name={NUMBER_FIELD} label="Card number">
                        <CardInput />
                    </ReduxForm.Field>
                </FieldRow>

                <FieldRow>
                    <ReduxForm.Field component={Field} name="ccexpiry" label="Expiry">
                        <ExpiryDate placeholder="mm/yy" />
                    </ReduxForm.Field>

                    <ReduxForm.Field component={Field} className="pw--overlayed-hint t-checkout-payment__credit-card-hints" name="cvv" label="CVV" hint={cvvHint}>
                        <input type="tel" noValidate maxLength={currentCard.cvvLength} />
                    </ReduxForm.Field>
                </FieldRow>
            </div>
        )

        return (
            <div>
                <div className="t-checkout-payment__title u-padding-top-lg u-padding-bottom-md">
                    <h2 className="u-h4 u-text-uppercase">Pay With Card</h2>
                </div>

                {hasExistingCreditCard ?
                    <div className="u-padding-md u-padding-top-lg u-padding-bottom-lg u-border-light-top u-border-light-bottom u-bg-color-neutral-00 t-checkout-payment__card">
                        <FieldRow>
                            <ReduxForm.Field
                                component={Field}
                                name="selectCreditCard"
                                label={<strong className="u-text-weight-regular">VISA **** **** **** 5678</strong>}
                                caption="John Appleseed"
                            >
                                <input type="radio" value={PAYMENT_EXISTING_CARD} onChange={this.handleRadioChange} defaultChecked noValidate />
                            </ReduxForm.Field>
                        </FieldRow>

                        <div className={classNames('u-margin-top-md t-checkout-payment__add-new-card', {'u-padding-md u-border-light': isNewCardInputSelected})}>
                            <FieldRow>
                                <ReduxForm.Field
                                    component={Field}
                                    name="selectCreditCard"
                                    label={<span className={isNewCardInputSelected && 'u-text-weight-medium'}>Add a new card</span>}
                                >
                                    <input type="radio" value={PAYMENT_NEW_CARD} onChange={this.handleRadioChange} noValidate />
                                </ReduxForm.Field>
                            </FieldRow>

                            {isNewCardInputSelected &&
                                <div className="u-margin-top-lg u-padding-top t-checkout-payment__add-new-card-form">
                                    {creditCardForm}
                                </div>
                            }
                        </div>
                    </div>
                :
                    <div className="u-padding-md u-padding-top-lg u-padding-bottom-lg u-border-light-top u-border-light-bottom u-bg-color-neutral-00 t-checkout-payment__card">
                        {creditCardForm}
                    </div>
                }
            </div>
        )
    }
}

CreditCardForm.propTypes = {
    /**
     * CVV type
     */
    cvvType: PropTypes.string,

    /**
     * Whether there's saved credit card data
     */
    hasExistingCreditCard: PropTypes.bool,

    /**
     * Whether 'add new card' option is selected
     */
    isNewCardInputSelected: PropTypes.bool,

    /**
     * Handle cvv type
     */
    setCvvType: PropTypes.func,

    /**
     * Handle card option selection to determine existing or new card option
     */
    toggleCardInputRadio: PropTypes.func,
}

const mapStateToProps = createPropsSelector({
    cvvType: selectors.getCvvType,
    hasExistingCreditCard: selectors.getHasExistingCreditCard,
    isNewCardInputSelected: selectors.getIsNewCardInputSelected
})

const mapDispatchToProps = {
    toggleCardInputRadio: checkoutPaymentActions.toggleCardInputRadio,
    setCvvType: checkoutPaymentActions.setCvvType,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreditCardForm)
