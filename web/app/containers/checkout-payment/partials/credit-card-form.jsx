import React from 'react'
import * as ReduxForm from 'redux-form'
// import {connect} from 'react-redux'
// import {createStructuredSelector} from 'reselect'
// import * as selectors from '../selectors'
// import {selectorToJS} from '../../../utils/selector-utils'

import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

// SDK Components
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import Image from 'progressive-web-sdk/dist/components/image'

const CREDIT_CARDS = { /* eslint-disable key-spacing */
    amex:       ['cc-american-express@3x.png', 'hint-amex@3x.png', 'Amex logo'],
    discovery:  ['cc-discovery@3x.png', 'hint-visa-mc@3x.png', 'Discovery logo'],
    mastercard: ['cc-mastercard@3x.png', 'hint-visa-mc@3x.png', 'Mastercard logo'],
    unionpay:   ['cc-unionpay@3x.png', 'hint-visa-mc@3x.png', 'UnionPay logo'],
    visa:       ['cc-visa@3x.png', 'hint-visa-mc@3x.png', 'Visa logo'],
} /* eslint-enable key-spacing */

const CreditCardForm = () => {
    const currentCard = CREDIT_CARDS.visa
    const ccHint = <Image src={getAssetUrl(`static/img/checkout/${currentCard[0]}`)} alt={currentCard[2]} height="29px" width="48px" />
    const cvvHint = <Image src={getAssetUrl(`static/img/checkout/${currentCard[1]}`)} alt="Demonstrating that the CCV is on the back of the Credit Card" height="29px" width="48px" />
    const creditCardForm = (
        <div>
            <FieldRow>
                <ReduxForm.Field component={Field} name="name" label="Cardholder Name">
                    <input type="text" noValidate />
                </ReduxForm.Field>
            </FieldRow>

            <FieldRow>
                <ReduxForm.Field component={Field} className="pw--overlayed-hint t-checkout-payment__credit-card-hints" name="ccnumber" label="Card number" hint={ccHint}>
                    <input type="tel" noValidate />
                </ReduxForm.Field>
            </FieldRow>

            <FieldRow>
                <ReduxForm.Field component={Field} name="ccexpiry" label="Expiry" placeholder="mm/yyyy">
                    <input type="number" noValidate />
                </ReduxForm.Field>

                <ReduxForm.Field component={Field} className="pw--overlayed-hint t-checkout-payment__credit-card-hints" name="cvv" label="CVV" hint={cvvHint}>
                    <input type="tel" noValidate />
                </ReduxForm.Field>
            </FieldRow>
        </div>
    )

    const hasExistingCreditCard = true
    const isNewCardInputSelected = true

    return (
        <div>
            <div className="t-checkout-payment__title u-padding-top-lg u-padding-bottom-lg">
                <h2 className="u-h4">Pay With Card</h2>
            </div>

            {hasExistingCreditCard ?
                <div className="u-padding-md u-padding-top-lg u-padding-bottom-lg u-border-light-top u-border-light-bottom u-bg-color-neutral-10">
                    <FieldRow>
                        <ReduxForm.Field
                            component={Field}
                            name="selectCreditCard"
                            label={<strong className="u-text-normal">VISA **** **** **** 5678</strong>}
                            caption="John Appleseed"
                        >
                            <input type="radio" noValidate />
                        </ReduxForm.Field>
                    </FieldRow>

                    <div className={isNewCardInputSelected ? 'u-padding-md u-margin-top-md u-border-light' : 'u-margin-top-md'}>
                        <FieldRow>
                            <ReduxForm.Field
                                component={Field}
                                name="selectCreditCard"
                                label={<span className={isNewCardInputSelected && 'u-text-semi-bold'}>Add a new card</span>}
                            >
                                <input type="radio" checked={isNewCardInputSelected} noValidate />
                            </ReduxForm.Field>
                        </FieldRow>

                        {isNewCardInputSelected &&
                            <div className="u-margin-top-md">
                                {creditCardForm}
                            </div>
                        }
                    </div>
                </div>
            :
                <div className="u-padding-md u-padding-top-lg u-padding-bottom-lg u-border-light-top u-border-light-bottom u-bg-color-neutral-10">
                    {creditCardForm}
                </div>
            }
        </div>
    )
}

const CreditCardReduxForm = ReduxForm.reduxForm({
    form: 'paymentCreditCardForm'
})(CreditCardForm)

export default CreditCardReduxForm
