import React, {PropTypes} from 'react'
import * as ReduxForm from 'redux-form'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import {PAYMENT_EXISTING_CARD, PAYMENT_NEW_CARD, AMEX_CARD, DEFAULT_CARD} from '../constants'

// Selectors
import * as selectors from '../selectors'

// Actions
import * as checkoutPaymentActions from '../actions'

// SDK Components
import CardInput from 'progressive-web-sdk/dist/components/card-input'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import Image from 'progressive-web-sdk/dist/components/image'

const CVV = { /* eslint-disable key-spacing */
    [AMEX_CARD]: {
        alt: 'Demonstrating that the CVV is on the front of the Credit Card',
        src: 'hint-amex@3x.png',
    },
    [DEFAULT_CARD]: {
        alt: 'Demonstrating that the CVV is on the back of the Credit Card',
        src: 'hint-visa-mc@3x.png',
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
        const value = input.value
        const currentType = this.props.cvvType

        // Set the cvv type based on the card number
        if (input.name === 'ccnumber') {
            // Don't trigger the actions unless things have changed
            if (value.match(/^3[47]/) && currentType !== AMEX_CARD) {
                this.props.setCvvType(AMEX_CARD)
            } else if (!value.match(/^3[47]/) && currentType !== DEFAULT_CARD) {
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
                    <ReduxForm.Field component={Field} name="ccnumber" label="Card number">
                        <CardInput />
                    </ReduxForm.Field>
                </FieldRow>

                <FieldRow>
                    <ReduxForm.Field component={Field} name="ccexpiry" label="Expiry">
                        <input type="number" noValidate placeholder="mm/yyyy" />
                    </ReduxForm.Field>

                    <ReduxForm.Field component={Field} className="pw--overlayed-hint t-checkout-payment__credit-card-hints" name="cvv" label="CVV" hint={cvvHint}>
                        <input type="tel" noValidate />
                    </ReduxForm.Field>
                </FieldRow>
            </div>
        )

        return (
            <div>
                <div className="t-checkout-payment__title u-padding-top-lg u-padding-bottom-md">
                    <h2 className="u-h4">Pay With Card</h2>
                </div>

                {hasExistingCreditCard ?
                    <div className="u-padding-md u-padding-top-lg u-padding-bottom-lg u-border-light-top u-border-light-bottom u-bg-color-neutral-00 t-checkout-payment__card">
                        <FieldRow>
                            <ReduxForm.Field
                                component={Field}
                                name="selectCreditCard"
                                label={<strong className="u-text-normal">VISA **** **** **** 5678</strong>}
                                caption="John Appleseed"
                            >
                                <input type="radio" value={PAYMENT_EXISTING_CARD} onChange={this.handleRadioChange} defaultChecked noValidate />
                            </ReduxForm.Field>
                        </FieldRow>

                        <div className={isNewCardInputSelected ? 'u-padding-md u-margin-top-md u-border-light' : 'u-margin-top-md'}>
                            <FieldRow>
                                <ReduxForm.Field
                                    component={Field}
                                    name="selectCreditCard"
                                    label={<span className={isNewCardInputSelected && 'u-text-semi-bold'}>Add a new card</span>}
                                >
                                    <input type="radio" value={PAYMENT_NEW_CARD} onChange={this.handleRadioChange} noValidate />
                                </ReduxForm.Field>
                            </FieldRow>

                            {isNewCardInputSelected &&
                                <div className="u-margin-top-lg u-padding-top">
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
     * Handle card option selection to determine existing or new card option
     */
    toggleCardInputRadio: PropTypes.func,
}

const CreditCardReduxForm = ReduxForm.reduxForm({
    form: 'paymentCreditCardForm'
})(CreditCardForm)

const mapStateToProps = createStructuredSelector({
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
)(CreditCardReduxForm)
